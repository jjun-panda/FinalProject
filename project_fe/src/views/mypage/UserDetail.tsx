import React, { useEffect, useState, useContext  } from "react";
import "../css/contents_mypage.css"
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import Paging from "../../components/paging";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImg from "../../assets/images/bg.png"
import maskDate from "../../components/maskDate";
import user from "../../assets/images/user.svg"
import "../css/user_page.css"
import UserDelete from "./UserDelete";

interface MyPage {
	name : string;
    phone : string;
    email : string;
    pwd : string;
}

export default function UserDetail() {
    const item_page = 9;

    const [memberInfo, setMemberInfo] = useState<MyPage>({} as MyPage);
    const { auth, setAuth } = useContext(AuthContext);

    // Paging
	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);

    	// Link 용 (함수) 
	let navigate = useNavigate();
    
    const [boardList, setBoardList] = useState<Board[]>([]);

    // 게시물의 최신순 
    const sortByDate = boardList.slice().sort((a, b) => {
        return new Date(b.writeDate).getTime() - new Date(a.writeDate).getTime();

    });

    /* [GET /board]: 게시글 목록 */
    const getBoardList = async (choice: string, search: string, page: number) => {

        await axios.get("http://localhost:8888/board", { params: { "choice": choice, "search": search, "page": page } })
        .then((resp) => {

            console.log(resp.data);
            const boardListFromServer = resp.data.boardList;
            const loggedInUserEmail = auth;
            const filteredBoardList = boardListFromServer.filter((board: { email: any; }) => {
                return board.email === loggedInUserEmail;
            });

            setBoardList(filteredBoardList);
            setTotalCnt(filteredBoardList.length);
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

	const changePage = (page: number) => {
		setPage(page);
		navigate("/board/list", { state: { gotoTop: true } });
	}

	/* 멤버 정보 불러오기 */
	const getMemberInfo = async (email: string) => {

		await axios.get("http://localhost:8888/user/getMemberInfo", { params: {"email": auth  }})
			.then((resp) => {
				console.log(resp.data);

				setMemberInfo(resp.data);
			})
			.catch((err) => {
				console.log(err);

			});
	}

	useEffect(() => {
		getMemberInfo("");
	}, []);

    return (
        <>
        <div id="body">
			<div id='contentsUserTum'>
				<div className="navigatorMain">
					<div className="navigatorWrapper">
                        <img src={user} alt="프로필 사진" />
						<p className="naviTitle bodyB24x">{memberInfo.name} 님</p>
                        <p>{memberInfo.phone}</p>
                        <p>{memberInfo.email}</p>
                        <ul className="naviator">
							<li className="menuWrapper">
								<Link className="menu body18x" to="/user/detail">나의 게시물</Link>
							</li>
                            <li className="menuWrapper">
								<Link className="menu body18x" to="#">기부 내역</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x" to="#">출금하기</Link>
							</li>
                            <hr />
                            <li className="menuWrapper">
								<Link className="menu body18x" to="/user/update">회원정보 수정</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x" to="/logout">로그아웃</Link>
							</li>
							<li className="menuWrapper">
                                < UserDelete />							
                            </li>
						</ul>
						<Link className="writeBtn" to="/board/write">글쓰기</Link>
					</div>
				</div>
				<div className="boardBox">
					<div id='contentsHeader'>
						<div>
							<p className="title24x">나의 게시물</p>
							<p className="body16x">{totalCnt}개의 게시물이 있습니다</p>
						</div>
                        <Link className="writeBtn" to="/board/write">글쓰기</Link>
					</div>

					<div id='contentsCards'>
						<div className="contentsGroup">
							<div className="contentsSebgroup">
								{
									boardList.length > 0 ? (
                                        sortByDate.map(function (board, idx) {
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
                        totalCnt > 9 ?
                        <Paging page={page} item_page={item_page} totalCnt={totalCnt} changePage={changePage} />
                        :
                        null
                    }
				</div>
			</div>
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
    const { auth, setAuth } = useContext(AuthContext); //여기부터 추가됨. auth부분은 사용자의 인증 상태를 나타내는 변수
	const board = props.obj;

	return (
		<>
		{
            //로그인한 이메일 과 게시판 이메일 같으면 (삼항연산자)
            (auth !== board.email) ?  null :
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
                                    <span>{maskDate({ writeDate: board.writeDate})}</span>・<span>조회수 {board.readCount}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    </>
                    :
                    // 삭제된 게시글
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
                                {
                                    (localStorage.getItem("email") === "admin") ?
                                    <>
                                        <span className="admin">[삭제된 글] {board.title}</span>	
                                    </>
                                    :
                                    <>
                                        삭제된 글 입니다.	
                                    </>
                                }
                                </p>
                                <div className="caption">
                                    <span>{maskDate({ writeDate: board.writeDate})}</span>・<span>조회수 {board.readCount}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    </>	
                }
            </>
        }
        </>
    );
} 