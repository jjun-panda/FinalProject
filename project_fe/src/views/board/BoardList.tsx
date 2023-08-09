import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImg from "../../assets/images/bg.png"
import '../css/contents_list.css'
import Button from "../../components/Button";
import '../../components/css/paging.css'
import Paging from "../../components/paging";
import maskDate from "../../components/maskDate";

export default function BoardList() {
   const item_page = 9; //한페이지에 보여줄 게시글 9개

   const [boardList, setBoardList] = useState([]); //게시글 배열로.

   // 검색용 Hook
   const [choiceVal, setChoiceVal] = useState("");
   const [searchVal, setSearchVal] = useState("");

   // Paging
   const [page, setPage] = useState(1);
   const [totalCnt, setTotalCnt] = useState(0);

   // Link 용 (함수) 
   let navigate = useNavigate();

   /* [GET /board]: 게시글 목록 */
   const getBoardList = async (choice: string, search: string, page: number) => {
      console.log("getBoardList - choice:", choice, "search:", search, "page:", page);

      await axios.get("http://localhost:8888/board", { params: { "choice": choice, "search": search, "page": page } })
         .then((resp) => {
            console.log(resp.data);

            setBoardList(resp.data.boardList);

            // 전체보기일 경우 response에서 가져온 pageCnt를 사용
            if (!choice && !search) {
               setTotalCnt(resp.data.pageCnt); //지피티와 합동!으로 힘냈다!
            } else {
               // 검색 결과일 경우 검색 결과의 길이를 사용하여 설정
               setTotalCnt(resp.data.boardList.length);
            }
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
      console.log("[BoardList.js searchBtn()] choiceVal=" + choiceVal + ", searchVal=" + searchVal);

      navigate("/board/list", { state: { gotoTop: true } });
      getBoardList(choiceVal, searchVal, 1);
   }

   const changePage = (page: number) => {
      setPage(page);
      getBoardList(choiceVal, searchVal, page);
      navigate("/board/list", { state: { gotoTop: true } });
   }

   const handleKeyUp = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
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
                        <Link className="menu body18x checked" to="/board/list">전체</Link>
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
                        <Link className="menu body18x" to="/board/list/fashion">멋의 패션</Link>
                     </li>
                  </ul>
                  <Link className="writeBtn" to="/board/write">글쓰기</Link>
               </div>
            </div>
            <div className="boardBox">
               <div id='contentsHeader'>
                  <div>
                     <p className="title24x">전체 게시물</p>
                     <p className="body16x">{totalCnt}개의 게시물이 있습니다</p>
                  </div>
                  <div className="searchMain">
                     <div className="customBox">
                        <select className="customSelect body16x" value={choiceVal} onChange={changeChoice}>
                           <option>선택</option>
                           <option value="title">제목</option>
                           <option value="content">내용</option>
                           <option value="writer">작성자</option>
                        </select>
                     </div>
                     <div className="searchBox">
                        <input type="text" className="form-control" placeholder="검색어" value={searchVal} onChange={changeSearch} onKeyUp={handleKeyUp} />
                     </div>
                     <Button size="Medium" type="button" className="searchButton" onClick={search}><i className="fas fa-search"></i> 검색</Button>
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
/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props: TableRowProps) {
   const board = props.obj;

   const delBoard = () => {
      alert("삭제된 글로 확인이 불가능합니다");
   };

   return (
      <>
         {
            (board.del === 0) ?
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
                              <span>{maskDate({ writeDate: board.writeDate })}</span>・<span>조회수 {board.readCount}</span>
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
                                    <span>{maskDate({ writeDate: board.writeDate })}</span>・<span>조회수 {board.readCount}</span>
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
                                    <span>{maskDate({ writeDate: board.writeDate })}</span>・<span>조회수 {board.readCount}</span>
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