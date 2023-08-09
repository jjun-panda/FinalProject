import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import bgImg from "../../assets/images/bg.png"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import maskDate from "../../components/maskDate";


export default function MyContents() {
  const [boardList, setBoardList] = useState<Board[]>([]);
  // Paging
  const [totalCnt, setTotalCnt] = useState(0);

  // 게시물의 최신순 
  const sortByDate = boardList.slice().sort((a, b) => {
    return new Date(b.writeDate).getTime() - new Date(a.writeDate).getTime();

  });

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

  return (
    <>
      <div id='contentsCards'>
        {
          sortByDate.map((board, idx) => (
            <TableRow obj={board} key={idx} cnt={idx + 1} />
          ))
        }
      </div>
    </>
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
function TableRow(props: TableRowProps) { //위에 데이터를 받음
  const { auth, setAuth } = useContext(AuthContext); //여기부터 추가됨. auth부분은 사용자의 인증 상태를 나타내는 변수

  const board = props.obj;

  return (
    <>
      {
        //로그인한 이메일 과 게시판 이메일 같으면 (삼항연산자)
        (auth === board.email) ?
          <>
            {
              (board.del === 0) ?
                // 삭제되지 않은 게시글
                <>
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
                </>
                :
                // 삭제된 게시글
                <>
                  <Link to={{ pathname: `/board/detail/${board.seq}` }} id='contentsBox'>
                    <div id="contentsImg" style={{filter: "grayscale(1)"}}>
                      <img src={bgImg} alt="" />
                    </div>
                    <div id='contentsText'>
                      <span className="category tag10x" style={{filter: "grayscale(1)"}}>
                        {board.category}
                      </span>
                      <p className="title bodyB16x" style={{filter: "grayscale(1)"}}>
                      {
                        (localStorage.getItem("email") === "admin") ?
                        <>
                          <span className="admin">[삭제된 글] {board.title}</span>	
                        </>
                        :
                        <>
                          ⚠️ 작성자에 의해 삭제된 댓글입니다.	
                        </>
                      }
                      </p>
                      <div className="caption" style={{filter: "grayscale(1)"}}>
                        <span>{maskDate({ writeDate: board.writeDate})}</span>・<span>조회수 {board.readCount}</span>
                      </div>
                    </div>
                  </Link>
                </>
            }
          </>
          :
          null
      }
    </>
  );
} 