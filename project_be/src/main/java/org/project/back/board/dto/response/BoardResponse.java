package org.project.back.board.dto.response;

import org.project.back.board.domain.Board;

public class BoardResponse {

    private Board board;

    public BoardResponse(Board board) {
        this.board = board;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }
}
