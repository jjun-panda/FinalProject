import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { HttpHeadersContext } from "../../context/HttpHeadersProvider";
import Button from "../../components/Button";
import React from "react";

function BoardUpdate() {

	const { headers, setHeaders } = useContext(HttpHeadersContext);
	const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const location = useLocation();
	const { board } = location.state;
	
	const [title, setTitle] = useState(board.title);
	const [content, setContent] = useState(board.content);

	const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	}

	const changeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
	}

	const updateBoard = async () => {

		const req = {
			email: auth, 
			title: title, 
			content: content
		}

		await axios.patch(`http://localhost:8888/board/${board.seq}`, req, {headers: headers})
		.then((resp) => {
			console.log(resp.data);

			if (resp.data.updatedRecordCount === 1) {
				alert("게시글을 수정했습니다");
				navigate(`/board/detail/${board.seq}`); // 글 상세로 이동
			}

		})
		.catch((err) => {
			console.log(err);
		});

	}


	return (
		<>
			<table className="table">
				<tbody>
					<tr>
						<th className="table-primary">작성자</th>
						<td>
							<input type="text" className="form-control"  value={board.email} readOnly />
						</td>
					</tr>

					<tr>
						<th className="table-primary">제목</th>
						<td>
							<input type="text" className="form-control" value={title} onChange={changeTitle} />
						</td>
					</tr>

					<tr>
						<th className="table-primary">내용</th>
						<td>
							<textarea className="form-control" value={content} onChange={changeContent} ></textarea>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="my-3 d-flex justify-content-center">
				<Button size="Small" className="btn btn-dark" onClick={updateBoard}><i className="fas fa-pen"></i> 수정하기</Button>
			</div>
		</>
	);

}

export default BoardUpdate;