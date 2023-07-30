import axios from "axios";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider";
import { HttpHeadersContext } from "../../context/HttpHeadersProvider";
import Button from "../../components/Button";
import '../css/comment.css'
import React from "react";
import user from "../../assets/images/user.svg"

interface Comment {
	seq: number;
	email: string;
	content: string;
	writeDate: string;
	del: number;
}

interface CommentProps {
	obj: Comment;
}

/* 댓글 컴포넌트 */
function Comment(props: CommentProps) {
	const {auth, setAuth} = useContext(AuthContext);
	const {headers, setHeaders} = useContext(HttpHeadersContext);
	const comment = props.obj;

	const navigate = useNavigate();

	const [show, setShow] = useState(false);

	const [content, setContent] = useState(comment.content);
	const changeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
	};

	/* 댓글 수정 */
	const updateComment = async () => {

		const req = {
			content: content
		};

		await axios.patch(`http://localhost:8888/comment/${comment.seq}`, req, {headers: headers})
		.then((resp) => {
			console.log(resp.data);

			alert("댓글을 성공적으로 수정했습니다 !");
			navigate(0);

		}).catch((err) => {
			console.log(err);

			alert(err.response.data);

		});


		updateToggle();
	}

	/* 댓글 삭제 */
	const deleteComment = async () => {
		await axios.delete(`http://localhost:8888/comment/${comment.seq}`)
			.then((resp) => {
				console.log("[BoardComment.js] deleteComment() success :D");
				console.log(resp.data);

				if (resp.data.deletedRecordCount == 1) {
					alert("댓글을 성공적으로 삭제했습니다 :D");
					navigate(0);
				}
			}).catch((err) => {
				console.log("[BoardComment.js] deleteComment() error :<");
				console.log(err);
			});
	}

	function updateToggle() { 
		setShow(show => !show) 
	}

	// 삭제되지 않은 댓글의 경우
	if (comment.del == 0) {
		return (
			<>
			<div id='commenterList'>
                <div id="commenterProfile">
                    <div className="spaceBetween">
                        <div id='commenterProfileLeft'>
                            <div id="commenterProfileImg">
                                <img alt="댓글자" src={user}/>
                            </div>
                            <div id="commenterProfiName">
                                <div className='bodyB14x nickName'>{comment.email}</div>
                                <div className='caption mail'>{comment.writeDate}</div>
                            </div>
							{
								/* 자신이 작성한 댓글인 경우에만 수정 삭제 가능 */
								(localStorage.getItem("email") == comment.email) ?
									<>
										<Button size="Small" className="btn btn-outline-secondary" onClick={updateToggle}><i className="fas fa-edit"></i> 수정</Button> &nbsp; 
										<Button size="Small" className="btn btn-outline-danger" onClick={deleteComment}><i className="fas fa-trash-alt"></i> 삭제</Button>
									
									</>
									:
									null
							}
                        </div>
                        <div id='commenterBtn'>
                            <img src="" alt="" width={24} />
                        </div>
                    </div>
                </div>
                <div id="commenterDescription">
					{
						/* 댓글 수정하는 경우 */
						show ?
							<>
								{/* 하단 영역 (댓글 내용 + 댓글 내용 편집 창) */}
								<div className="my-3 d-flex justify-content-center">
									<textarea className="col-10" value={content} onChange={changeContent}></textarea>
								</div>
								<div className="my-1 d-flex justify-content-center">
									<button className="btn btn-dark" onClick={updateComment}><i className="fas fa-edit"></i>  수정 완료</button>
								</div>
							</>
						:
							<>
								{/* 하단 영역 (댓글 내용) */}
								<div className='body14x' id="commenterDetail">
									<p>
										{content}
									</p>
								</div>
							</>
					}
                </div>
            </div>
			</>
		);
	}

	// 삭제된 댓글의 경우
	else {
		return (
			<>
			<div id='commenterList'>
				<div className='body14x' id="commenterDetail">
					<p>
						⚠️ 작성자에 의해 삭제된 댓글입니다.
					</p>
				</div>
			</div>
			</>
		);
	}
}

export default Comment;