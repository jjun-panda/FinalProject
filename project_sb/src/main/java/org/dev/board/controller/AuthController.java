package org.dev.board.controller;

import org.dev.board.dto.LogInDto;
import org.dev.board.dto.LogInResponseDto;
import org.dev.board.dto.ResponseDto;
import org.dev.board.dto.SignUpDto;
import org.dev.board.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(originPatterns = "http://192.168.10.93:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthService authService;

	@PostMapping("/signUp")
	public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody) {
		ResponseDto<?> result = authService.signUp(requestBody);
		return result;
	}

	@PostMapping("/logIn")
	public ResponseDto<LogInResponseDto> logIn(@RequestBody LogInDto requestBody) {
		ResponseDto<LogInResponseDto> result = authService.logIn(requestBody);
		return result;
	}

}