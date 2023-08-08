import axios from "axios";
import { useState, useEffect } from "react";
import '../css/comment.css'
import React from "react";
import CommentWrite from "./CommentWrite";
import Paging from "../../components/paging";
import CommentUpdate from "./CommentUpdate";

interface CommentListProps {
	seq: number;
}

function CommentList(props: CommentListProps) {
	const item_page = 5;

	const seq = props.seq;

	// Paging
	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);

	const [commentList, setCommentList] = useState([]);

	useEffect(() => {
        setTotalCnt(5);
    }, []);

	const changePage = (page: number) => {
		setPage(page);
		getCommentList(page);
	}

	const getCommentList = async (page: number) => {
		await axios.get(`http://localhost:8888/comment`, { params: { "boardSeq": seq, "page": page } })
			.then((resp) => {
				console.log(resp.data);

				setCommentList(resp.data.commentList);
				setTotalCnt(resp.data.pageCnt);

			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getCommentList(1);
	}, []);

	return (
		<>

		<p className='title24x commentTitle'>댓글<span className="body20x">{totalCnt}개</span></p>
		

		{/* 댓글 작성 */}
		<CommentWrite seq={Number(seq)} />

			{
				commentList.map(function (comment, idx) {
					return (
						<div key={idx}>
							<CommentUpdate obj={comment} key={idx} />
						</div>
					);
				})
			}
			{
				totalCnt > 5 ?
					<Paging page={page} item_page={item_page} totalCnt={totalCnt} changePage={changePage} />
					:
					null
			}
			
		</>
	);
}


export default CommentList;