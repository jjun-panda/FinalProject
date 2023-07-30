package org.project.back.board.dao;

import java.util.List;
import org.project.back.board.domain.Board;
import org.project.back.board.dto.param.BoardCountParam;
import org.project.back.board.dto.param.BoardListParam;
import org.project.back.board.dto.param.CreateBoardAnswerParam;
import org.project.back.board.dto.param.CreateBoardParam;
import org.project.back.board.dto.param.CreateReadCountParam;
import org.project.back.board.dto.param.UpdateBoardParam;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;



@Mapper
@Repository
public interface BoardDao {

	List<Board> getBoardSearchPageList(BoardListParam param);
	Integer getBoardCount(BoardCountParam param);

	Board getBoard(Integer seq);
	Integer createBoardReadCountHistory(CreateReadCountParam param);
	Integer increaseBoardReadCount(Integer seq);

	void createBoard(CreateBoardParam param);

	Integer updateBoardStep(Integer parentSeq);
	Integer getBoardAnswerCount(Integer parentSeq);
	void createBoardAnswer(CreateBoardAnswerParam param);

	Integer updateBoard(UpdateBoardParam param);

	Integer deleteBoard(Integer seq);
}
