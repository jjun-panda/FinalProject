import axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { HttpHeadersContext } from "../../context/HttpHeadersProvider";
import Button from "../../components/Button";
import React from "react";

function BoardWrite() {

	const { auth, setAuth } = useContext(AuthContext)
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	}

	const changeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
	}

	/* [POST /board]: 게시글 작성 */
	const createBoard = async() => {

		const req = {
			email: localStorage.getItem("email"), 
			title: title, 
			content: content
		}

		await axios.post("http://localhost:8888/board", req, {headers: headers})
		.then((resp) => {
			console.log(resp.data);

			alert("새로운 게시글을 성공적으로 등록했습니다 :D");
			navigate(`/board/detail/${resp.data.seq}`); // 새롭게 등록한 글 상세로 이동
		})
		.catch((err) => {
			console.log(err);
		});
	}

	useEffect(() => {
		if (!auth) {
			alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
			navigate(-1);
		}
	}, []);


	return (
		<div id='body'>
			<table className="table">
				<tbody>
					<tr>
						<th className="table-primary">작성자</th>
						<td>
							<p>{localStorage.getItem("email") || ""}</p>
							{/* <input type="text" className="form-control"  value={localStorage.getItem("email") || ""} readOnly /> */}
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
							<textarea className="form-control" value={content} onChange={changeContent}></textarea>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="my-5 d-flex justify-content-center">
				<Button size="Small" className="btn btn-outline-secondary" onClick={createBoard}><i className="fas fa-pen"></i> 등록하기</Button>
			</div>
		</div>
	);
}

export default BoardWrite;