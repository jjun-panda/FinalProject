package org.project.back.board.dto.param;

import org.project.back.board.dto.request.CreateBoardRequest;

public class CreateBoardParam {

    private Integer seq;
    private String email;
    private String title;
    private String content;

	private String fileImg;
	private String category;

    public CreateBoardParam(CreateBoardRequest req) {
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
    // 사용자가 파일을 첨부한 경우
    public void setFileImg(String fileImg) {
        this.fileImg = fileImg;
    }

    // 사용자가 파일을 첨부하지 않은 경우
    public void setFileImgToNull() {
        this.fileImg = null;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
