package org.project.back.board.controller;

import java.util.Date;
import org.project.back.board.dto.request.BoardListRequest;
import org.project.back.board.dto.request.CreateBoardRequest;
import org.project.back.board.dto.request.UpdateBoardRequest;
import org.project.back.board.dto.response.BoardListResponse;
import org.project.back.board.dto.response.BoardResponse;
import org.project.back.board.dto.response.CreateBoardResponse;
import org.project.back.board.dto.response.DeleteBoardResponse;
import org.project.back.board.dto.response.UpdateBoardResponse;
import org.project.back.board.service.BoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/board")
public class BoardController {

	private final BoardService service;

	public BoardController(BoardService service) {
		this.service = service;
	}

	/* 게시글 목록 API */
	@GetMapping
	public ResponseEntity<BoardListResponse> getBoardList(@ModelAttribute BoardListRequest req){
		System.out.println("BoardController getBoardList() " + new Date());

		return ResponseEntity.ok(service.getBoardList(req));
	}

	/* 게시글 상세 API */
	@GetMapping("/{seq}")
	public ResponseEntity<BoardResponse> getBoard(@PathVariable  Integer seq, @RequestParam String readerEmail) {
		System.out.println("BoardController getBoard() " + new Date());

		return ResponseEntity.ok(service.getBoard(seq, readerEmail));
	}

	/* 게시글 작성 */
	@PostMapping
	public ResponseEntity<CreateBoardResponse> createBoard(@RequestBody CreateBoardRequest req) {
		System.out.println("BoardController createBoard " + new Date());

		return ResponseEntity.ok(service.createBoard(req));
	}

	/* 게시글 수정  */
	@PatchMapping("/{seq}")
	public ResponseEntity<UpdateBoardResponse> updateBoard(@PathVariable Integer seq, @RequestBody UpdateBoardRequest req) {
		System.out.println("BoardController updateBoard " + new Date());

		return ResponseEntity.ok(service.updateBoard(seq, req));
	}

	/* 게시글 삭제  */
	@DeleteMapping("/{seq}")
	public ResponseEntity<DeleteBoardResponse> deleteBoard(@PathVariable Integer seq) {
		System.out.println("BoardController deleteBoard " + new Date());

		return ResponseEntity.ok(service.deleteBoard(seq));
	}
}








