package org.project.back.comment.service;

import java.util.List;
import java.util.stream.Collectors;

import org.project.back.comment.BadWordEntity;
import org.project.back.comment.repository.BadWordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BadWordsService {
    
	private final BadWordsRepository badWordsRepository;

	@Autowired
    public BadWordsService(BadWordsRepository badWordsRepository) {
        this.badWordsRepository = badWordsRepository;
    }

    public List<String> getBadWords() {
        List<BadWordEntity> badWordEntities = badWordsRepository.findAll();
        return badWordEntities.stream().map(BadWordEntity::getWord).collect(Collectors.toList());
    }
}