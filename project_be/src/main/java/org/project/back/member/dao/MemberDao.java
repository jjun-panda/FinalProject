package org.project.back.member.dao;

import org.project.back.member.domain.Member;
import org.project.back.member.dto.param.CreateMemberParam;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberDao {

	Member findByEmail(String email);

	Integer isExistUserEmail(String email);

	Integer createMember(CreateMemberParam param);
}
