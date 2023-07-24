package org.dev.board.service;

import org.dev.board.dto.PatchUserDto;
import org.dev.board.dto.PatchUserResponseDto;
import org.dev.board.dto.ResponseDto;
import org.dev.board.entity.UserEntity;
import org.dev.board.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired UserRepository userRepository;
	
	public ResponseDto<PatchUserResponseDto> patchUser(PatchUserDto dto,String userEmail) {
		UserEntity userEntity = null;
		String userNickname = dto.getUserNickname();
		String userProfile = dto.getUserProfile();
		
		try {
			userEntity = userRepository.findByUserEmail(userEmail);
			if (userEntity == null) 
				return ResponseDto.setFailed("사용자가 존재하지 않습니다.");

			userEntity.setUserNickname(userNickname);
			userEntity.setUserProfile(userProfile);
			
			userRepository.save(userEntity);
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseDto.setFailed("DB 실패");
		}
		
		userEntity.setUserPassword("");
		
		PatchUserResponseDto patchUserResponseDto = new PatchUserResponseDto();
		
		return ResponseDto.setSuccess("성공", patchUserResponseDto);
	}
}
