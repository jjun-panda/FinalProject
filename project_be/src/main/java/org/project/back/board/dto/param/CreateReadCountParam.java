package org.project.back.board.dto.param;

public class CreateReadCountParam {

    private Integer boardSeq; // 게시글 번호
    private String readerEmail; // 게시글 조회자 아이디

    public CreateReadCountParam(Integer boardSeq, String readerEmail) {
        this.boardSeq = boardSeq;
        this.readerEmail = readerEmail;
    }

    public Integer getBoardSeq() {
        return boardSeq;
    }

    public void setBoardSeq(Integer boardSeq) {
        this.boardSeq = boardSeq;
    }

    public String getReaderEmail() {
        return readerEmail;
    }

    public void setReaderEmail(String readerEmail) {
        this.readerEmail = readerEmail;
    }
}
