package org.project.back.board.service;

import java.util.List;
import java.util.Objects;
import org.project.back.board.dao.BoardDao;
import org.project.back.board.domain.Board;
import org.project.back.board.dto.param.BoardCountParam;
import org.project.back.board.dto.param.BoardListParam;
import org.project.back.board.dto.param.CreateBoardAnswerParam;
import org.project.back.board.dto.param.CreateBoardParam;
import org.project.back.board.dto.param.CreateReadCountParam;
import org.project.back.board.dto.param.UpdateBoardParam;
import org.project.back.board.dto.request.BoardListRequest;
import org.project.back.board.dto.request.CreateBoardRequest;
import org.project.back.board.dto.request.UpdateBoardRequest;
import org.project.back.board.dto.response.BoardListResponse;
import org.project.back.board.dto.response.BoardResponse;
import org.project.back.board.dto.response.CreateBoardResponse;
import org.project.back.board.dto.response.DeleteBoardResponse;
import org.project.back.board.dto.response.UpdateBoardResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BoardService {

	private final BoardDao dao;

	public BoardService(BoardDao dao) {
		this.dao = dao;
	}

	/* 게시글 조회 */
	public BoardListResponse getBoardList(BoardListRequest req) {
		BoardListParam param = new BoardListParam(req);
		param.setPageParam(req.getPage(), 9);

		List<Board> boardList = dao.getBoardSearchPageList(param);
		int pageCnt = dao.getBoardCount(new BoardCountParam(req));

		return new BoardListResponse(boardList, pageCnt);
	}

	/* 특정 글 */
	/* 조회수 수정 */
	public BoardResponse getBoard(Integer seq, String readerEmail) {
		// 로그인 한 사용자의 조회수만 카운팅
		if (!readerEmail.isEmpty()) {
			CreateReadCountParam param = new CreateReadCountParam(seq, readerEmail);
			Integer result = dao.createBoardReadCountHistory(param); // 조회수 히스토리 처리 (insert: 1, update: 2)
			if (result == 1) {
				Integer updatedRecordCount = dao.increaseBoardReadCount(seq); // 조회수 증가
			}
		}

		return new BoardResponse(dao.getBoard(seq));
	}

	/* 글 추가 */
	public CreateBoardResponse createBoard(CreateBoardRequest req) {
		CreateBoardParam param = new CreateBoardParam(req);
		dao.createBoard(param);
		return new CreateBoardResponse(param.getSeq());
	}

	/* 답글 추가 */
	// public CreateBoardResponse createBoardAnswer(Integer parentSeq, CreateBoardRequest req) {
	// 	Integer updatedRecordCount = dao.updateBoardStep(parentSeq);
	// 	Integer boardAnswerCount = dao.getBoardAnswerCount(parentSeq);
	// 	// TODO - 예외처리
	// 	if (!Objects.equals(updatedRecordCount, boardAnswerCount)) {
	// 		System.out.println("BoardService createBoardAnswer: Fail update parent board step !!");
	// 		return null;
	// 	}

	// 	CreateBoardAnswerParam param = new CreateBoardAnswerParam(parentSeq, req);
	// 	dao.createBoardAnswer(param);
	// 	return new CreateBoardResponse(param.getSeq());
	// }

	/* 글 수정 */
	public UpdateBoardResponse updateBoard(Integer seq, UpdateBoardRequest req) {
		Integer updatedRecordCount = dao.updateBoard(new UpdateBoardParam(seq, req));
		return new UpdateBoardResponse(updatedRecordCount);
	}

	/* 게시글 삭제 */
	public DeleteBoardResponse deleteBoard(Integer seq) {
		Integer deletedRecordCount = dao.deleteBoard(seq);
		return new DeleteBoardResponse(deletedRecordCount);
	}
}






