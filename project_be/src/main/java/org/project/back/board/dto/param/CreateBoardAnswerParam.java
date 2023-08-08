package org.project.back.board.dto.param;

import org.project.back.board.dto.request.CreateBoardRequest;

public class CreateBoardAnswerParam {

    private Integer seq;
    private Integer parentSeq;
    private String email;
    private String title;
    private String content;

	private String fileImg;
	private String category;

    public CreateBoardAnswerParam(Integer parentSeq, CreateBoardRequest req) {
        this.parentSeq = parentSeq;
        this.email = req.getEmail();
        this.title = req.getTitle();
        this.content = req.getContent();
        this.fileImg = req.getFileImg();
        this.category = req.getCategory();
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public Integer getParentSeq() {
        return parentSeq;
    }

    public void setParentSeq(Integer parentSeq) {
        this.parentSeq = parentSeq;
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

    public String getFileImg() {
        return fileImg;
    }

    public void setFileImg(String fileImg) {
        this.fileImg = fileImg;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
