package org.dev.board.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(originPatterns = "http://localhost:3000")
//@CrossOrigin(originPatterns = "http://192.168.10.93:3000")
@RestController
@RequestMapping("/")
public class MainController {

	@GetMapping("")
	public String hello() {
//		return "Connection Successful";
		return "연결 성공";
	}
}