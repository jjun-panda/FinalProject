package org.project.back.board.dto.param;

import org.project.back.board.dto.request.CreateBoardRequest;

public class CreateBoardParam {

    private Integer seq;
    private String email;
    private String title;
    private String content;

    public CreateBoardParam(CreateBoardRequest req) {
        this.email = req.getEmail();
        this.title = req.getTitle();
        this.content = req.getContent();
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
