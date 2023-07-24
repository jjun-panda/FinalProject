package org.dev.board.dto;

import org.dev.board.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogInResponseDto {
	private String token;
	private int exprTime;
	private UserEntity user;
}
