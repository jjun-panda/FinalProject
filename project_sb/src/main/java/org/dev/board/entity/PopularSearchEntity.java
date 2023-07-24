package org.dev.board.entity;

import javax.persistence.Entity;
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
@Entity(name = "PopularSearch") // 해당클래스를 Entity로 사용
@Table(name = "popular_search_db") // 데이터베이스에 있는 해당 테이블과 현재 클래스를 매핑 시킴
public class PopularSearchEntity {
	@Id
	private String popularTerm;
	private int popularSearchCount;
}