package org.project.back.member.dto.response;

import org.project.back.member.domain.Member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberInfoResponse {

	private String name, phone, email;

	public MemberInfoResponse(String name, String phone, String email) {
		this.name = name;
		this.phone = phone;
		this.email = email;
	}

	public MemberInfoResponse(Member result) {
		this.name = result.getName();
		this.phone = result.getPhone();
		this.email = result.getEmail();
	}

}
