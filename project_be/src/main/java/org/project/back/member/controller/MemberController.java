package org.project.back.member.controller;

import java.util.Date;
import javax.validation.Valid;
import org.project.back.member.dto.request.SignupRequest;
import org.project.back.member.domain.Member;
import org.project.back.member.dto.request.LoginRequest;
import org.project.back.member.dto.response.SignupResponse;
import org.project.back.member.dto.response.LoginResponse;
import org.project.back.member.dto.response.MemberInfoResponse;
import org.project.back.member.exception.MemberException;
import org.project.back.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class MemberController {

	private final MemberService service;

	public MemberController(MemberService service) {
		this.service = service;
	}

	@GetMapping
	public ResponseEntity<?> checkEmailDuplicate(@RequestParam String email) {
		System.out.println("UserController checkEmailDuplicate " + new Date());

		HttpStatus status = service.checkEmailDuplicate(email);
		return new ResponseEntity<>(status);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest req) {
		System.out.println("UserController signup " + new Date());

		return ResponseEntity.ok(service.signup(req));
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
		System.out.println("UserController login " + new Date());

		return ResponseEntity.ok(service.login(req));
	}


	/* 요청 DTO 검증 예외처리 핸들러 */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		System.out.println("UserController handleMethodArgumentNotValidException " + new Date());

		BindingResult bs = e.getBindingResult();
		StringBuilder sb = new StringBuilder();
		bs.getFieldErrors().forEach(err -> {
			sb.append(String.format("[%s]: %s.\n입력된 값: %s",
						err.getField(), err.getDefaultMessage(), err.getRejectedValue()));
		});

		return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);
	}

	/* 사용자 관련 요청 예외처리 핸들러 */
	@ExceptionHandler(MemberException.class)
	public ResponseEntity<?> handleUserException(MemberException e) {
		System.out.println("UserController handlerUserException " + new Date());

		return new ResponseEntity<>(e.getMessage(), e.getStatus());
	}
	
	/* 멤버 정보*/
	@GetMapping("/getMemberInfo")
	public ResponseEntity<MemberInfoResponse> getMemberInfo(@RequestParam String email){
		System.out.println("MemberInfo Controller getMemberInfo ||" + new Date());
		
		return ResponseEntity.ok(service.getMemberInfo(email));
	}
	
	/* 맴버 수정 */
	@PostMapping("/updateMember")
	public ResponseEntity<Integer> updateMember(@RequestBody Member member){
		System.out.println("MemberDelete Controller updateMember ==>> " + new Date());
		
		return ResponseEntity.ok(service.updateMember(member));
	}
	
	
	/* 멤버 삭제*/
	@GetMapping("/deleteMember")
	public ResponseEntity<Integer> deleteMember(@RequestParam String email){
		System.out.println("MemberDelete Controller deleteMember ==>> " + new Date());
		
		return ResponseEntity.ok(service.deleteMember(email));
	}
}


