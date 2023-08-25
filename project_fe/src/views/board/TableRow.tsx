import React from 'react'
import { Link } from 'react-router-dom';
import bgImg from "../../assets/images/bg.png"
import maskDate from '../../components/maskDate';

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
export default function TableRow(props: TableRowProps) {
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
					<>
					<div className="contentsTrgroup">
						<Link to={{ pathname: `/board/detail/${board.seq}` }} id='contentsBox'>
							<div id="contentsImg" style={{filter: "grayscale(1)"}}>
								<img src={bgImg} alt="" />
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
					</div>
					</>
					:
					<>
					<div className="contentsTrgroup">
						<Link to='#' id='contentsBox' onClick={delBoard}>
							<div id="contentsImg" style={{filter: "grayscale(1)"}}>
								<img src={bgImg} alt="" />
							</div>
							<div id='contentsText' style={{filter: "grayscale(1)"}}>
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
					</div>
					</>
				}
			</>	
		}
		</>
	);
}
