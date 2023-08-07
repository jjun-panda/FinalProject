import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImg from "../../assets/images/bg.png"
import '../css/contents_list.css'
import Button from "../../components/Button";
import '../../components/css/paging.css'
import Paging from "../../components/paging";
import maskDate from "../../components/maskDate";

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

function ListCategoryFashion() {
	const category_name = "멋의 패션";
	const item_page = 9;
	const [boardList, setBoardList] = useState<BoardItem[]>([]);

	// 검색용 Hook
	const [choiceVal, setChoiceVal] = useState("");
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
		console.log("[BoardList.js searchBtn()] choiceVal=" + choiceVal + ", searchVal=" + searchVal);

		navigate("/board/list", { state: { gotoTop: true } });
		getBoardList(choiceVal, searchVal, 1);
	}

	const changePage = (page: number) => {
		setPage(page);
		navigate("/board/list", { state: { gotoTop: true } });
	};

	const filterByCategory = (boardList: BoardItem[]): BoardItem[] => {
		return boardList.filter((board) => board.category === category_name);
	};
	
	const [currentPageList, setCurrentPageList] = useState<BoardItem[]>([]);

	const filteredBoardList = filterByCategory(boardList);
	const totalFilteredCnt = filteredBoardList.length;

	
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
								<Link className="menu body18x" to="/board/list/music">아름다운 음악</Link>
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
								<Link className="menu body18x checked" to="/board/list/fashion">멋의 패션</Link>
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
									<option>검색옵션</option>
									<option value="title">제목</option>
									<option value="content">내용</option>
									<option value="writer">작성자</option>
								</select>
							</div>
							<div className="searchBox">
								<input type="text" className="form-control" placeholder="검색어" value={searchVal} onChange={changeSearch} />
							</div>
							<Button size="Medium" type="button" className="searchButton" onClick={search}><i className="fas fa-search"></i> 검색</Button>
						</div>
					</div>

					<div id='contentsCards'>
						<div className="contentsGroup">
							<p className="contentsBox body14x">스타일리시한 패션 아이템과 유행을 선도하는 패션 트렌드를 엿보는 재미로운 패션 컨텐츠를 만나보세요.<br/>멋진 스타일과 자신만의 패션 감각으로 세상을 더 화려하게 빛나게 해봅시다!</p>
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
									<p>해당 게시물이 존재하지 않습니다.</p>
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

interface Board {
	seq: number;
	title: string;
	content: string;
	email: string;
	del: number;
	readCount: number;
	writeDate: string;
	fileImg: string;
	category: string;
}

interface TableRowProps {
	obj: Board;
	cnt: number;
}
/* 글 목록 컴포넌트 */
function TableRow(props: TableRowProps) {
	const board = props.obj;

	const delBoard = () => {
		alert("삭제된 글로 확인이 불가능합니다");		
	};

	return (
		<>
		{
			(board.del == 0) ?
			// 삭제되지 않은 게시글
			<>
				<div className="contentsTrgroup">
					<Link to={{ pathname: `/board/detail/${board.seq}` }} id='contentsBox'>
						<div id="contentsImg">
							<img src={bgImg} alt="" />
						</div>
						<div id='contentsText'>
							<span className="category tag10x">
								{board.category}
							</span>
							<p className="title bodyB16x">
								{board.title}
							</p>
							<div className="caption">
								<span>{maskDate({ writeDate: board.writeDate})}</span>・<span>조회수 {board.readCount}</span>
							</div>
						</div>
					</Link>
				</div>
			</>
			:
			// 삭제된 게시글
			<>
				{
				(localStorage.getItem("email") === "admin") ?
					<div className="contentsTrgroup">
						<Link to={{ pathname: `/board/detail/${board.seq}` }} id='contentsBox'>
							<div id="contentsImg">
								<img src={bgImg} alt="" />
							</div>
							<div id='contentsText'>
								<span className="category tag10x">
								{board.category}
								</span>
								<p className="title bodyB16x">
									<span className="admin">[삭제된 글] {board.title}</span>	
								</p>
								<div className="caption">
									<span>{maskDate({ writeDate: board.writeDate})}</span>・<span>조회수 {board.readCount}</span>
								</div>
							</div>
						</Link>
					</div>
					:
					<div className="contentsTrgroup">
						<Link to='#' id='contentsBox' onClick={delBoard}>
							<div id="contentsImg">
								<img src={bgImg} alt="" />
							</div>
							<div id='contentsText'>
								<span className="category tag10x">
								{board.category}
								</span>
								<p className="title bodyB16x">
									삭제된 글 입니다.
								</p>
								<div className="caption">
									<span>{maskDate({ writeDate: board.writeDate})}</span>・<span>조회수 {board.readCount}</span>
								</div>
							</div>
						</Link>
					</div>
				}
			</>	
		}
		</>
	);
}

interface ArrowProps {
	depth: number;
}

const tap = "\u00A0\u00A0\u00A0\u00A0";
function Arrow(props: ArrowProps) {
	const depth = props.depth;

	if (depth === 0) {
		return null;
	}

	const taps = [];
	for(let i = 0; i < depth; i++) {
		taps.push(tap);
	}

	return (
		<>
			{taps} <i className="fas fa-long-arrow-alt-right"></i>
		</> 
	);
}

export default ListCategoryFashion;