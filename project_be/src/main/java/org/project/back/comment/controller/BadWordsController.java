package org.project.back.comment.controller;

import java.util.List;

import org.project.back.comment.service.BadWordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/badWords")
public class BadWordsController {

	@Autowired
    private BadWordsService badWordsService;

    @GetMapping("/list")
    public ResponseEntity<List<String>> getBadWords() {
        List<String> badWords = badWordsService.getBadWords();
        return ResponseEntity.ok(badWords);
    }
}