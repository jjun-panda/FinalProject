package org.project.back.member.dao;

import org.project.back.member.domain.Member;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberDao {

	Member findByEmail(String email);

	Integer isExistUserEmail(String email);

	Integer createMember(Member member);
	
	Integer updateMemberByEmail(Member merber);
	
	Integer deleteMemberByEmail(String email);
}
