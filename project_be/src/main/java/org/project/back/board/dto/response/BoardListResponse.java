package org.project.back.board.dto.response;

import java.util.List;
import org.project.back.board.domain.Board;

public class BoardListResponse {

    private List<Board> boardList;
    private Integer pageCnt;

    public BoardListResponse(List<Board> boardList, Integer pageCnt) {
        this.boardList = boardList;
        this.pageCnt = pageCnt;
    }

    public List<Board> getBoardList() {
        return boardList;
    }

    public void setBoardList(List<Board> boardList) {
        this.boardList = boardList;
    }

    public Integer getPageCnt() {
        return pageCnt;
    }

    public void setPageCnt(Integer pageCnt) {
        this.pageCnt = pageCnt;
    }
}
