import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImg from "../../assets/images/bg.png"
import '../css/contents_list.css'
import Button from "../../components/Button";
import '../../components/css/paging.css'
import Paging from "../../components/paging";
import maskDate from "../../components/maskDate";
import TableRow from "./TableRow";
import NotFoundContents from "../../components/app/NotFoundContents";

type BoardItem = {
	seq: number;
	title: string;
	content: string;
	email: string;
	del: number;
	readCount: number;
	writeDate: string;
	fileImg: string;
	category: string;
};

export default function ListCategoryMusic() {
	const category_name = "아름다운 음악";
	const item_page = 9;
	const [boardList, setBoardList] = useState<BoardItem[]>([]);

	// 검색용 Hook
	const [choiceVal, setChoiceVal] = useState("all");
	const [searchVal, setSearchVal] = useState("");

	// Paging
	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);

	// Link 용 (함수) 
	const navigate = useNavigate();

	/* [GET /board]: 게시글 목록 */
	const getBoardList = async (choice: string, search: string, page: number) => {

		await axios.get("http://localhost:8888/board", { params: { "choice": choice, "search": search, "page": page } })
			.then((resp) => {
				console.log(resp.data);

				setBoardList(resp.data.boardList);
				setTotalCnt(resp.data.pageCnt);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getBoardList("", "", 1);
	}, []);

	const location = useLocation();

	useEffect(() => {
		if (location.state?.gotoTop) {
			window.scrollTo(0, 0);
		}
	}, [location]);

	useEffect(() => {
		const filteredBoardList = filterByCategory(boardList);
		setTotalCnt(filteredBoardList.length);
	
		const startIndex = (page - 1) * item_page;
		const endIndex = Math.min(startIndex + item_page, filteredBoardList.length);
		setCurrentPageList(filteredBoardList.slice(startIndex, endIndex));
	}, [boardList, page]);
	
	const changeChoice = (event: ChangeEvent<HTMLSelectElement>) => { setChoiceVal(event.target.value); }
	const changeSearch = (event: ChangeEvent<HTMLInputElement>) => { setSearchVal(event.target.value); }
	const search = () => {
		console.log("[BoardList] choiceVal=" + choiceVal + ", searchVal=" + searchVal);

		navigate("/s", { state: { gotoTop: true } });
		getBoardList(choiceVal, searchVal, 1);
	}

	const changePage = (page: number) => {
		setPage(page);
		navigate("/board/list", { state: { gotoTop: true } });
		getBoardList(choiceVal, searchVal, page);
	}

	const filterByCategory = (boardList: BoardItem[]): BoardItem[] => {
		return boardList.filter((board) => board.category === category_name);
	};
	
	const [currentPageList, setCurrentPageList] = useState<BoardItem[]>([]);

	const filteredBoardList = filterByCategory(boardList);
	const totalFilteredCnt = filteredBoardList.length;

	const handleKeyUp = (e: React.KeyboardEvent) => {
		if(e.key === 'Enter') {
			search();
		}
	}

	
	return (
		<div id="body">
			<div id='contentsListTum'>
				<div className="navigatorMain">
					<div className="navigatorWrapper">
						<p className="naviTitle bodyB24x">카테고리</p>
						<ul className="naviator">
							<li className="menuWrapper">
								<Link className="menu body18x" to="/board/list">전체</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x" to="/board/list/life">슬기로운 라이프</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x checked" to="/board/list/music">아름다운 음악</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x" to="/board/list/cooking">맛있는 요리</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x" to="/board/list/design_dev">디자인 & 개발</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x" to="/board/list/art">미술의 감성</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x" to="/board/list/fashion">멋의 패션</Link>
							</li>
						</ul>
						<Link className="writeBtn" to="/board/write">글쓰기</Link>
					</div>
				</div>
				<div className="boardBox">
					<div id='contentsHeader'>
						<div>
							<p className="title24x">{category_name}</p>
							<p className="body16x">{filteredBoardList.length}개의 게시물이 있습니다</p>
						</div>
						<div className="searchMain">
							<div className="customBox">
								<select className="customSelect body16x" value={choiceVal} onChange={changeChoice}>
									<option value="all">통합검색</option>
									<option value="title">제목</option>
									<option value="content">내용</option>
									<option value="writer">작성자</option>
								</select>
							</div>
							<div className="searchBox">
								<input type="text" className="form-control" placeholder="검색어" value={searchVal} onChange={changeSearch} onKeyUp={handleKeyUp} />
							</div>
							<Button size="Medium" type="button" className="searchButton" onClick={search}>검색</Button>
						</div>
					</div>

					<div id='contentsCards'>
						<div className="contentsGroup">
							{
								filteredBoardList.length > 0 ? 
								<p className="contentsBox body14x">감미로운 멜로디와 아름다운 가사로 마음을 녹이는 음악들을 소개합니다.<br/>힐링되는 음악과 감성적인 곡들로 특별한 감동을 선사하는 음악 세계로 초대합니다. 일상 속에서 음악과 함께하는 특별한 시간을 만들어보세요!</p>
								:
								null
							}
							<div className="contentsSebgroup">
							{
									filteredBoardList.length > 0 ? (
										filteredBoardList.map(function (board, idx) {
											if (board.category === category_name) {
											return <TableRow obj={board} key={idx} cnt={idx + 1} />;
										} else {
											return null;
										}
									})
									) : (
										<NotFoundContents />
								)
							}
							</div>
						</div>
					</div>
					{
						filteredBoardList.length > 0 ? 
						<Paging page={page} item_page={item_page} totalCnt={totalCnt} changePage={changePage} />
						:
						null
					}				
					</div>
			</div>
		</div>
	);
}