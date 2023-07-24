package org.dev.board.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.dev.board.dto.SignUpDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "User") // 해당클래스를 Entity로 사용
@Table(name = "user_db") // 데이터베이스에 있는 해당 테이블과 현재 클래스를 매핑 시킴
public class UserEntity {
	@Id
	private String userEmail;
	private String userPassword;
	private String userNickname;
	private String userPhoneNumber;
	private String userProfile;

	public UserEntity(SignUpDto dto) {
		this.userEmail = dto.getUserEmail();
		this.userPassword = dto.getUserPassword();
		this.userNickname = dto.getUserNickname();
		this.userPhoneNumber = dto.getUserPhoneNumber();
	}
}
