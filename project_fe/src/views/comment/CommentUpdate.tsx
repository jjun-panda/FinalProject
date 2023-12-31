import axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider";
import { HttpHeadersContext } from "../../context/HttpHeadersProvider";
import user from "../../assets/images/user.svg";
import maskEmail from "../../components/maskEmail";
import maskDate from "../../components/maskDate";
import { detectBadWords } from "../../utils/BadWords";
import Button from "../../components/Button";
import React from "react";

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
function CommentUpdate(props: CommentProps) {
	const {auth, setAuth} = useContext(AuthContext);
	const [badWords, setBadWords] = useState<string[]>([]);
	const {headers, setHeaders} = useContext(HttpHeadersContext);
	const comment = props.obj;
	const [consecutiveBadWordsCount, setConsecutiveBadWordsCount] = useState(0);
	const [isCommentingDisabled, setIsCommentingDisabled] = useState<boolean>(
		localStorage.getItem("isCommentingDisabled") === "true" || false
	);
	useEffect(() => {
		if (isCommentingDisabled) {
			setTimeout(() => {
			setIsCommentingDisabled(false);
			localStorage.removeItem("isCommentingDisabled");
		  }, 5 * 60 * 1000); // 5분 동안 댓글 작성 비활성화
		}
	}, [isCommentingDisabled]);

	const fetchBadWords =  async () => {

		await axios.get('http://localhost:8888/badWords/list', )
		.then((resp) => {
			setBadWords(resp.data);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	useEffect(() => {
		fetchBadWords();
	}, []);
	
	const navigate = useNavigate();

	const [show, setShow] = useState(false);

	const [content, setContent] = useState(comment.content);
	const updateContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const commentValue = event.target.value;

		// 댓글 내용에 욕설이 있는지 감지
		const containsBadWord = detectBadWords(commentValue, badWords);
		if (containsBadWord) {
			setConsecutiveBadWordsCount(prevCount => prevCount + 1);
			// console.log(consecutiveBadWordsCount);

			if (consecutiveBadWordsCount + 1 >= 3) {
				setIsCommentingDisabled(true);
				localStorage.setItem("isCommentingDisabled", "true"); // 로컬 스토리지에 저장
				setTimeout(() => {
					setIsCommentingDisabled(false);
					localStorage.removeItem("isCommentingDisabled");
					setConsecutiveBadWordsCount(0);
			  	}, 5 * 60 * 1000); // 5분 동안 댓글 작성 비활성화
				alert("5분 동안 댓글 작성 불가능합니다.");
			} else {
				alert("비속어 및 욕설이 감지되었습니다.");
			}
			return;
		}
		// setConsecutiveBadWordsCount(0);
		setContent(commentValue);
	};

	/* 댓글 수정 */
	const updateComment = async() => {

		const req = {
			content: content
		};

		await axios.patch(`http://localhost:8888/comment/${comment.seq}`, req, {headers: headers})
		.then((resp) => {
			console.log(resp.data);

			alert("댓글을 성공적으로 수정했습니다 !");
			navigate(0);

		})
		.catch((err) => {
			console.log(err);
			alert("댓글 수정 실패했습니다 !");
		});


		updateToggle();
	}

	/* 댓글 삭제 */
	const deleteComment = async () => {
		await axios.delete(`http://localhost:8888/comment/${comment.seq}`)
			.then((resp) => {
				console.log(resp.data);

				if (resp.data.deletedRecordCount == 1) {
					alert("댓글을 성공적으로 삭제했습니다 !");
					navigate(0);
				}
			}).catch((err) => {
				console.log(err);
				alert("댓글을 삭제 실패했습니다 !");
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
                                <div className='bodyB14x nickName'>{maskEmail(comment.email)}</div>
								<div className='caption mail'>{maskDate({ writeDate: comment.writeDate })}</div>
                            </div>
						</div>
						<div id='commenterProfileRight'>
							{
								/* 자신이 작성한 댓글인 경우에만 수정 삭제 가능 */
								(localStorage.getItem("email") === comment.email || localStorage.getItem("email") === "admin") ?
								<>
									{
										show ?
										<>
										<div className="menu caption">
										{
											isCommentingDisabled ?
												null
											: 
												<a className="updateToggle caption" onClick={updateComment}>수정 완료</a>
										}
										</div>
										</>
										:
										<>
										<div className="menu caption">
											{/* <a onClick={updateToggle}><img src={writingIcon} alt="" width={20}/></a> */}
											<a className="updateToggle caption" onClick={updateToggle}>수정</a>
											<span>|</span>
											{/* <a onClick={deleteComment}><img src={deleteIcon} alt="" width={20}/></a> */}
											<a className="deleteComment caption" onClick={deleteComment}>삭제</a>
										</div>
										</>
									}
								</>
								:
								null
							}
                        </div>
                    </div>
                </div>
					{
						/* 댓글 수정하는 경우 */
						show ?
							<>
								{/* 하단 영역 (댓글 내용 + 댓글 내용 편집 창) */}
								{
									isCommentingDisabled ?
										<textarea 
											className="commentBox body14x disabled" 
											value='5분동안 수정 불가능합니다 :/'
											rows={1}
											disabled={isCommentingDisabled}
										></textarea>
										: 
										<textarea 
											className="commentBox body14x" 
											title="댓글"
											id="commentTextarea"
											rows={1}
											maxLength={300}
											value={content} 
											onChange={updateContent}
											placeholder='댓글은 최대 300자까지 작성 가능합니다.'
											disabled={isCommentingDisabled}
										></textarea>
								}
							</>
						:
							<>
								<div id="commenterDescription">
									{/* 하단 영역 (댓글 내용) */}
									<div className='body14x commenterDetail'>
										<p>
											{content}
										</p>
									</div>
								</div>
							</>
					}
            </div>
			</>
		);
	}

	// 삭제된 댓글의 경우
	else {
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
                                <div className='bodyB14x nickName'>{maskEmail(comment.email)}</div>
								<div className='caption mail'>{maskDate({ writeDate: comment.writeDate })}</div>
                            </div>
						</div>
                    </div>
                </div>
				<div id="commenterDescription">
					{/* 하단 영역 (댓글 내용) */}
					<div className='body14x commenterDetail'>
						<p className="commentDele">
							{
								(localStorage.getItem("email") === "admin") ?
								<>
									<span>[삭제된 글] {content}</span>
								</>
								:
								<>
									⚠️ 작성자에 의해 삭제된 댓글입니다.
								</>
							}
						</p>
					</div>
				</div>
            </div>
			</>
		);
	}
}

export default CommentUpdate;