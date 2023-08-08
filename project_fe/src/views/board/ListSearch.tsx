import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../css/contents_list.css'
import Button from "../../components/Button";
import '../../components/css/paging.css'
import Paging from "../../components/paging";
import TableRow from "./TableRow";

export default function ListSearch() {
	const item_page = 9;

	const [boardList, setBoardList] = useState([]);

	// 검색용 Hook
	const [choiceVal, setChoiceVal] = useState("all");
	const [searchVal, setSearchVal] = useState("");
	const search_name = choiceVal || "통합검색";

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
	
	const changeChoice = (event: ChangeEvent<HTMLSelectElement>) => { setChoiceVal(event.target.value); }
	const changeSearch = (event: ChangeEvent<HTMLInputElement>) => { setSearchVal(event.target.value); }
	const search = () => {
		console.log("[BoardList] choiceVal=" + choiceVal + ", searchVal=" + searchVal);

		navigate("/s", { state: { gotoTop: true } });
		getBoardList(choiceVal, searchVal, 1);
	}

	const changePage = (page: number) => {
		setPage(page);
		navigate("/s", { state: { gotoTop: true } });
		getBoardList(choiceVal, searchVal, page);
	}

	const handleKeyUp = (e: React.KeyboardEvent) => {
		if(e.key === 'Enter') {
			search();
		}
	}

	return (

		<div id="body">
			<div id='contentsListTum'>
				<div className="boardBox">
					<div id='contentsHeader'>
						<div>
							<p className="title24x">{search_name}</p>
							<p className="body16x">{totalCnt}개의 게시물이 있습니다</p>
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
							<div className="contentsSebgroup">
							{
									boardList.length > 0 ? (
										boardList.map(function (board, idx) {
											return <TableRow obj={board} key={idx} cnt={idx + 1} />;
										})
								) : (
									<p>해당 게시물이 존재하지 않습니다.</p>
								)
							}
							</div>
						</div>
					</div>
					{
						boardList.length > 0 ? 
						<Paging page={page} item_page={item_page} totalCnt={totalCnt} changePage={changePage} />
						:
						null
					}				
					</div>
			</div>
		</div>
	);
}