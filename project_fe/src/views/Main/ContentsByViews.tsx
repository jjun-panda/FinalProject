import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import bgImg from "../../assets/images/bg.png"
import maskDate from "../../components/maskDate";

export default function ContentsByViews() {

    const [boardList, setBoardList] = useState<Board[]>([]);

    // Paging
    const [totalCnt, setTotalCnt] = useState(0);

    // 게시물의 조회수 상위순
    const sortByViews = boardList.slice().sort((a, b) => b.readCount - a.readCount);

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
                sortByViews.slice(0, 4).map((board, idx) => (
                    <div className="contentsTrgroup" key={board.seq}>
                        <div id='contentsCards'>
                        <TableRow obj={board} cnt={idx + 1} />
                        </div>
                    </div>
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
function TableRow(props: TableRowProps) {
    const board = props.obj;

	const delBoard = () => {
		alert("삭제된 글은 확인이 불가능합니다");		
	};

    return (
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
            {
                (localStorage.getItem("email") === "admin") ?
                <>
                    <Link to={{ pathname: `/board/detail/${board.seq}` }} id='contentsBox'>
                        <div id="contentsImg">
                            <img src={bgImg} alt="" style={{filter: "grayscale(1)"}}/>
                        </div>
                        <div id='contentsText'>
                            <span className="category tag10x" style={{filter: "grayscale(1)"}}>
                            {board.category}
                            </span>
                            <p className="title bodyB16x">
                                <span className="admin">[삭제된 글] {board.title}</span>	
                            </p>
                            <div className="caption" style={{filter: "grayscale(1)"}}>
                                <span>{maskDate({ writeDate: board.writeDate})}</span>・<span>조회수 {board.readCount}</span>
                            </div>
                        </div>
                    </Link>
                </>
                :
                <>
                    <Link to='#' id='contentsBox' onClick={delBoard}>
                        <div id="contentsImg">
                            <img src={bgImg} alt="" style={{filter: "grayscale(1)"}}/>
                        </div>
                        <div id='contentsText'>
                            <span className="category tag10x" style={{filter: "grayscale(1)"}}>
                            {board.category}
                            </span>
                            <p className="title bodyB16x" style={{filter: "grayscale(1)"}}>
                                ⚠️ 작성자에 의해 삭제된 댓글입니다.
                            </p>
                            <div className="caption" style={{filter: "grayscale(1)"}}>
                                <span>{maskDate({ writeDate: board.writeDate})}</span>・<span>조회수 {board.readCount}</span>
                            </div>
                        </div>
                    </Link>
                </>
            }
            </>	
        }
        </>
    );
}