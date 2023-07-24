package org.dev.board.repository;

import java.util.List;

import org.dev.board.entity.PopularSearchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PopularSearchRepository extends JpaRepository<PopularSearchEntity, String> {
	
//	/popularsearchList
	public List<PopularSearchEntity> findTop10ByOrderByPopularSearchCountDesc();

}