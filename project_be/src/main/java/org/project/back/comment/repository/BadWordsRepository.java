package org.project.back.comment.repository;

import org.project.back.comment.BadWordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadWordsRepository extends JpaRepository<BadWordEntity, Long> {
}