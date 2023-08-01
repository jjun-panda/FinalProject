package org.project.back.comment.dto.param;

import org.project.back.board.dto.request.CreateCommentRequest;

public class CreateCommentParam {

    private Integer boardSeq;
    private Integer seq;
    private String email;
    private String content;

    public CreateCommentParam(Integer boardSeq, CreateCommentRequest req) {
        this.boardSeq = boardSeq;
        this.email = req.getEmail();
        this.content = req.getContent();
    }

    public Integer getBoardSeq() {
        return boardSeq;
    }

    public void setBoardSeq(Integer boardSeq) {
        this.boardSeq = boardSeq;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
