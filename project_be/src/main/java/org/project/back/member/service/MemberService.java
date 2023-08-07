package org.project.back.member.service;

import org.project.back.jwt.JwtTokenUtil;
import org.project.back.member.dao.MemberDao;
import org.project.back.member.domain.Member;
import org.project.back.member.dto.request.LoginRequest;
import org.project.back.member.dto.request.SignupRequest;
import org.project.back.member.dto.response.LoginResponse;
import org.project.back.member.dto.response.MemberInfoResponse;
import org.project.back.member.dto.response.SignupResponse;
import org.project.back.member.exception.MemberException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {

	private final MemberDao dao;
	private final PasswordEncoder encoder;
	private final AuthenticationManager authenticationManager;

	private final JwtTokenUtil jwtTokenUtil;
	private final UserDetailsService userDetailsService;

	public MemberService(MemberDao dao, PasswordEncoder encoder,
			AuthenticationManager authenticationManager,
			JwtTokenUtil jwtTokenUtil,
			UserDetailsService userDetailsService) {
		this.dao = dao;
		this.encoder = encoder;
		this.authenticationManager = authenticationManager;
		this.jwtTokenUtil = jwtTokenUtil;
		this.userDetailsService = userDetailsService;
	}

	public HttpStatus checkEmailDuplicate(String email) {
		isExistUserEmail(email);
		return HttpStatus.OK;
	}

	@Transactional
	public SignupResponse signup(SignupRequest req) {
		saveMember(req);
		authenticate(req.getEmail(), req.getPwd());

		return new SignupResponse(req.getEmail());
	}

	private void saveMember(SignupRequest req) {
		// 아이디 중복 확인
		isExistUserEmail(req.getEmail());

		// 패스워드 일치 확인
		checkPwd(req.getPwd(), req.getCheckPwd());

		// 회원 정보 생성
		String encodedPwd = encoder.encode(req.getPwd());
		Member member = new Member(req, encodedPwd);

		Integer result = dao.createMember(member);
		if (result == 0) {
			throw new MemberException("회원 등록을 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public LoginResponse login(LoginRequest req) {
		authenticate(req.getEmail(), req.getPwd());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(req.getEmail());
		final String token = jwtTokenUtil.generateToken(userDetails);

		return new LoginResponse(token, req.getEmail());
	}

	private void authenticate(String email, String pwd) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, pwd));
		} catch (DisabledException e) {
			throw new MemberException("인증되지 않은 아이디입니다.", HttpStatus.BAD_REQUEST);
		} catch (BadCredentialsException e) {
			throw new MemberException("아이디또는 비밀번호를 다시 확인해주세요.", HttpStatus.BAD_REQUEST);
		}
	}

	private void isExistUserEmail(String email) {
		Integer result = dao.isExistUserEmail(email);
		if (result == 1) {
			throw new MemberException("이미 사용중인 아이디입니다.", HttpStatus.BAD_REQUEST);
		}
	}

	private void checkPwd(String pwd, String checkPwd) {
		if (!pwd.equals(checkPwd)) {
			throw new MemberException("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
		}
	}

	/* 맴버 정보 존재한다면 디비에서 불러오기 */
	public MemberInfoResponse getMemberInfo(String email) {
		Integer result = dao.isExistUserEmail(email);
		if (result == 0) {
			throw new MemberException("등록되지 않은 사용자입니다.", HttpStatus.BAD_REQUEST);
		}
		
		Member memberInfo = dao.findByEmail(email);

		return new MemberInfoResponse(memberInfo);
	}

	/* 맴버 이메일이 존재하는지 확인 후 삭제 */
	public Integer deleteMember(String email) {
		Integer result = dao.isExistUserEmail(email);
		if (result == 0) {
			throw new MemberException("등록되지 않은 사용자입니다.", HttpStatus.BAD_REQUEST);
		}
		return dao.deleteMemberByEmail(email);
	}
	
	/* 맴버 이메일이 존재하는지 확인 후 업데이트 */
	public Integer updateMember(Member member) {
		Integer result = dao.isExistUserEmail(member.getEmail());
		if (result == 0) {
			throw new MemberException("등록되지 않은 사용자입니다.", HttpStatus.BAD_REQUEST);
		}
		return dao.updateMemberByEmail(member);
	}
}
