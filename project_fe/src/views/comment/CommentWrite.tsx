import axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HttpHeadersContext } from "../../context/HttpHeadersProvider";
import Button from "../../components/Button";
import { AuthContext } from "../../context/AuthProvider";
import user from "../../assets/images/user.svg"
import { detectBadWords } from "../../utils/BadWords";

interface CommnetWriteProps {
	seq: number;
}

function CommentWrite(props: CommnetWriteProps) {
	const { auth, setAuth } = useContext(AuthContext);
	const [badWords, setBadWords] = useState<string[]>([]);

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

	const getBoardDetail = async () => {

		await axios.get(`http://localhost:8888/board/${seq}`, {params: {readerEmail: auth ? auth : ""}})
		.then((resp) => {
			console.log(resp.data);

			setBoard(resp.data.board);
		})
		.catch((err) => {
			console.log(err);
		});

	}

	useEffect(() => {
		getBoardDetail();
	}, []);

	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const email = localStorage.getItem("email");
	const seq = props.seq;

	const navigate = useNavigate();

	const [content, setContent] = useState("");
	
	const chageContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const commentValue = event.target.value;

		// 댓글 내용에 욕설이 있는지 감지
		const containsBadWord = detectBadWords(commentValue, badWords);
		if (containsBadWord) {
			alert("비속어 및 욕설이 감지되었습니다.");
			return;
		}
		setContent(commentValue);
	};

	const createComment = async() => {

		const req = {
			email: email,
			content: content,
			boardSeq: seq
		}

		await axios.post(`http://localhost:8888/comment`, req, { params: {"boardSeq": seq}, headers: headers})
		.then((resp) => {
			console.log(resp.data);

			if (resp.data.seq != null) {
				alert("댓글을 성공적으로 등록했습니다 :D");
				navigate(0);
			}

		}).catch((err) => {
			console.log(err);
		});
	}

	return (
		<>
		<div id='commenterTextbox'>
			{
				(auth) ? // 로그인한 사용자만 댓글 작성 가능
				<>
				<div id="commenterProfile">
					<div className="spaceBetween">
						<div id='commenterProfileLeft'>
							<div id="commenterProfileImg">
								<img alt="댓글자" src={user}/>
							</div>
							<div id="commenterProfiName">
								<div className='bodyB14x nickName'>{email}</div>
							</div>
						</div>
					</div>
				</div>
				</>
				:
				null
			}
			<div className='textBox'>
				{
					(auth) ? // 로그인한 사용자만 댓글 작성 가능
					<>
						<textarea
							className='body14x'
							title="댓글"
							id="commentTextarea"
							rows={2}
							maxLength={300}
							value={content} 
							onChange={chageContent}
							placeholder='댓글은 최대 300자까지 작성 가능합니다. 다양한 의견이 서로 존중될 수 있도록 다른 사람에게 불쾌감을 주는 욕설, 혐오,
							비하의 표현이나 타인의 권리를 침해하는 내용은 주의해주세요.'
						></textarea>
						<Button size='Small' onClick={createComment} >등록</Button>
					</>
					:
					<textarea
						className='body14x'
						title="댓글"
						id="commentTextarea"
						rows={1}
						// onChange={chageContent}
						placeholder='댓글을 작성하시려면 로그인이 필요합니다.'
					></textarea>
				}
			</div>
		</div>
		</>
	)
}

export default CommentWrite;

function setBoard(board: any) {
	// throw new Error("Function not implemented.");
}
