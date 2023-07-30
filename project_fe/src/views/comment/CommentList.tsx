import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import '../css/comment.css'
import Comment from "./Comment"
import React from "react";

interface CommentListProps {
	seq: number;
}

function CommentList(props: CommentListProps) {

	const seq = props.seq;

	// Paging
	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);

	const [commentList, setCommentList] = useState([]);

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

			}).catch((err) => {
				console.log(err);

			});
	}

	useEffect(() => {
		getCommentList(1);
	}, []);

	return (
		<>
			{
				commentList.map(function (comment, idx) {
					return (
						<div key={idx}>
							<Comment obj={comment} key={idx} />
						</div>
					);
				})
			}
			<Pagination
				activePage={page}
				itemsCountPerPage={5}
				totalItemsCount={totalCnt}
				pageRangeDisplayed={5}
				prevPageText={"‹"}
				nextPageText={"›"}
				onChange={changePage} />
		</>

	);
}


export default CommentList;