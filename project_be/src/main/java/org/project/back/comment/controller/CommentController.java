package org.project.back.comment.controller;

import java.util.Date;
import java.util.List;

import org.project.back.board.dto.request.CreateCommentRequest;
import org.project.back.board.dto.response.CreateCommentResponse;
import org.project.back.comment.dto.request.CommentRequest;
import org.project.back.comment.dto.request.UpdateCommentRequest;
import org.project.back.comment.dto.response.CommentResponse;
import org.project.back.comment.dto.response.DeleteCommentResponse;
import org.project.back.comment.dto.response.UpdateCommentResponse;
import org.project.back.comment.service.BadWordsService;
import org.project.back.comment.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/comment")
public class CommentController {

    private final CommentService service;
    private final BadWordsService badWordsService;

    public CommentController(CommentService service, BadWordsService badWordsService) {
        this.service = service;
        this.badWordsService = badWordsService;
    }

    /* 댓글 조회 */
    @GetMapping
    public ResponseEntity<CommentResponse> getBoardCommentList(@ModelAttribute CommentRequest req) {
        System.out.println("CommentController getBoardCommentList " + new Date());

        return ResponseEntity.ok(service.getBoardCommentList(req));
    }

    /* 댓글 작성 */
    @PostMapping
    public ResponseEntity<CreateCommentResponse> createComment(@RequestParam Integer boardSeq,
        @RequestBody CreateCommentRequest req) {
        System.out.println("CommentController createComment " + new Date());

        // 비속어 필터링
        List<String> badWords = badWordsService.getBadWords();
        String content = req.getContent();
        boolean containsBadWord = badWords.stream().anyMatch(content::contains);

        if (containsBadWord) {
            // 비속어가 포함된 댓글은 저장하지 않음
            return ResponseEntity.badRequest().build();
        }
        
        return ResponseEntity.ok(service.createComment(boardSeq, req));
    }

    /* 댓글 삭제 */
    @DeleteMapping("/{seq}")
    public ResponseEntity<DeleteCommentResponse> deleteComment(@PathVariable Integer seq) {
        System.out.println("CommentController deleteComment " + new Date());

        return ResponseEntity.ok(service.deleteComment(seq));
    }

    /* 댓글 수정 */
    @PatchMapping("/{seq}")
    public ResponseEntity<UpdateCommentResponse> updateComment(@AuthenticationPrincipal UserDetails userDetails,
                                                                @PathVariable Integer seq,
                                                                @RequestBody UpdateCommentRequest req) {

        return ResponseEntity.ok(service.updateComment(userDetails.getUsername(), seq, req));
    }
}
