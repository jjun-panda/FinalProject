package org.dev.board.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Likes") // 해당클래스를 Entity로 사용
@Table(name = "likes_db") // 데이터베이스에 있는 해당 테이블과 현재 클래스를 매핑 시킴
public class LikesEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 생성을 데이터베이스에게 위임하는 방식으로 id값을 따로 할당하지 않아도 데이터베이스가 자동으로
														// AUTO_INCREMENT를 하여 기본키를 생성
	private int likeId;
	private int boardNumber;
	private String userEmail;
	private String likeUserProfile;
	private String likeUserNickname;
}