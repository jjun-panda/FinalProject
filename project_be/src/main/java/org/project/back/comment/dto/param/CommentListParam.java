package org.project.back.comment.dto.param;

import org.project.back.board.dto.param.PageParam;

public class CommentListParam extends PageParam {

    private Integer boardSeq; // 게시글 번호

    public CommentListParam(Integer boardSeq) {
        this.boardSeq = boardSeq;
    }

    public Integer getBoardSeq() {
        return boardSeq;
    }

    public void setBoardSeq(Integer boardSeq) {
        this.boardSeq = boardSeq;
    }
}
