package org.project.back.board.dto.response;

public class DeleteBoardResponse {

    private Integer deletedRecordCount;

    public DeleteBoardResponse(Integer deletedRecordCount) {
        this.deletedRecordCount = deletedRecordCount;
    }

    public Integer getDeletedRecordCount() {
        return deletedRecordCount;
    }

    public void setDeletedRecordCount(Integer deletedRecordCount) {
        this.deletedRecordCount = deletedRecordCount;
    }
}
