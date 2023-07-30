package org.project.back.comment.dao;

import java.util.List;
import org.project.back.comment.domain.Comment;
import org.project.back.comment.dto.param.CommentListParam;
import org.project.back.comment.dto.param.CreateCommentParam;
import org.project.back.comment.dto.param.UpdateCommentParam;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CommentDao {

    List<Comment> getCommentPageList(CommentListParam param);
    Integer getCommentCount(Integer seq);

    void createComment(CreateCommentParam param);
    Integer deleteComment(Integer seq);

    Comment getCommentBySeq(Integer seq);
    Integer updateComment(UpdateCommentParam param);
}
