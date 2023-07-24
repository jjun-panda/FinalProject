package org.dev.board.service;

import org.dev.board.dto.LogInDto;
import org.dev.board.dto.LogInResponseDto;
import org.dev.board.dto.ResponseDto;
import org.dev.board.dto.SignUpDto;
import org.dev.board.entity.UserEntity;
import org.dev.board.repository.UserRepository;
import org.dev.board.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	TokenProvider tokenProvider;
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	// 회원가입
	public ResponseDto<?> signUp(SignUpDto dto) {
		String userEmail = dto.getUserEmail();
		String userPassword = dto.getUserPassword();
		String userPasswordCheck = dto.getUserPassword();

//		email 중복 확인
		try {
			if (userRepository.existsById(userEmail))
				return ResponseDto.setFailed("이미 가입된 이메일주소입니다.");
		} catch (Exception e) {
			return ResponseDto.setFailed("DB에러! 이미 가입된 이메일주소");
		}

//		비밀번호가 다르면 오류메시지 출력
		if (!userPassword.equals(userPasswordCheck))
			return ResponseDto.setFailed("비밀번호가 다릅니다.");

//		UserEntity 생성
		UserEntity userEntity = new UserEntity(dto);
		
//		비밀번호 암호화 처리(토큰)
		String encodedPassword = passwordEncoder.encode(userPassword);
		userEntity.setUserPassword(encodedPassword);

//		UserRepository를 이용해서 DB에 저장
		try {
			userRepository.save(userEntity);
		} catch (Exception e) {
			return ResponseDto.setFailed("DB에러! 저장실패");
		}

//		성공 성공메시지 출력
		return ResponseDto.setSuccess("가입완료", null);
	}

	// 로그인
	public ResponseDto<LogInResponseDto> logIn(LogInDto dto) {
		String userEmail = dto.getUserEmail();
		String userPassword = dto.getUserPassword();
		
		UserEntity userEntity = null;

		try {
			userEntity = userRepository.findByUserEmail(userEmail);
			if (userEntity == null)
				return ResponseDto.setFailed("로그인 오류입니다");
			if (passwordEncoder.matches(userPassword, userEntity.getUserPassword()))
				return ResponseDto.setFailed("로그인 오류입니다");
		} catch (Exception e) {
			return ResponseDto.setFailed("DB에러!");
		}

		userEntity.setUserPassword("");

		String token = tokenProvider.create(userEmail);
		int exprTime = 3600000;

		LogInResponseDto logInResponseDto = new LogInResponseDto(token, exprTime, userEntity);
		return ResponseDto.setSuccess("로그인 성공", logInResponseDto);
	}
}
