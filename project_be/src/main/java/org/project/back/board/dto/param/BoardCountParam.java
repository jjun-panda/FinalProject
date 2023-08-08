package org.project.back.board.dto.param;

import org.project.back.board.dto.request.BoardListRequest;

public class BoardCountParam {

    private String choice;
    private String search;

    public BoardCountParam(BoardListRequest req) {
        this.choice = req.getChoice();
        this.search = req.getChoice();
    }

    public String getChoice() {
        return choice;
    }

    public void setChoice(String choice) {
        this.choice = choice;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }
}
