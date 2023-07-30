package org.project.back.board.dto.response;

public class CreateBoardResponse {

    private Integer seq;

    public CreateBoardResponse(Integer seq) {
        this.seq = seq;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }
}
