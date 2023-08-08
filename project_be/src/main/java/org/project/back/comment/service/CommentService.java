package org.project.back.comment.service;

import java.util.List;
import org.project.back.board.dto.request.CreateCommentRequest;
import org.project.back.board.dto.response.CreateCommentResponse;
import org.project.back.comment.dao.CommentDao;
import org.project.back.comment.domain.Comment;
import org.project.back.comment.dto.param.CommentListParam;
import org.project.back.comment.dto.param.CreateCommentParam;
import org.project.back.comment.dto.param.UpdateCommentParam;
import org.project.back.comment.dto.request.CommentRequest;
import org.project.back.comment.dto.request.UpdateCommentRequest;
import org.project.back.comment.dto.response.CommentResponse;
import org.project.back.comment.dto.response.DeleteCommentResponse;
import org.project.back.comment.dto.response.UpdateCommentResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

    private final CommentDao dao;

    public CommentService(CommentDao dao) {
        this.dao = dao;
    }

    /* 댓글 조회 */
    public CommentResponse getBoardCommentList(CommentRequest req) {
        CommentListParam param = new CommentListParam(req.getBoardSeq());
        param.setPageParam(req.getPage(), 5);

        List<Comment> commentList = dao.getCommentPageList(param);
        Integer pageCnt = dao.getCommentCount(req.getBoardSeq());

        return new CommentResponse(commentList, pageCnt);
    }

    /* 댓글 작성 */
    public CreateCommentResponse createComment(Integer seq, CreateCommentRequest req) {
        CreateCommentParam param = new CreateCommentParam(seq, req);
        dao.createComment(param);
        return new CreateCommentResponse(param.getSeq());
    }

    /* 댓글 삭제 */
    public DeleteCommentResponse deleteComment(Integer seq) {
        Integer deletedRecordCount = dao.deleteComment(seq);
        return new DeleteCommentResponse(deletedRecordCount);
    }

    /* 댓글 수정 */
    @Transactional
    public UpdateCommentResponse updateComment(String email, Integer seq, UpdateCommentRequest req) {
        Comment comment = dao.getCommentBySeq(seq);
        if (!comment.getEmail().equals(email)) {
            System.out.println("작성자만 댓글을 수정할 수 있습니다.");
            return null;
        }

        Integer updatedRecordCount = dao.updateComment(new UpdateCommentParam(seq, req.getContent()));
        if (updatedRecordCount != 1) {
            System.out.println("댓글 수정에 실패했습니다.");
            return null;
        }

        return new UpdateCommentResponse(updatedRecordCount);
    }


}
