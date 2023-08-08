package org.project.back.board.dto.param;

import org.project.back.board.dto.request.UpdateBoardRequest;

public class UpdateBoardParam {

    private Integer seq;
    private String title;
    private String content;

	private String fileImg;
	private String category;

    public UpdateBoardParam(Integer seq, UpdateBoardRequest req) {
        this.seq = seq;
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
