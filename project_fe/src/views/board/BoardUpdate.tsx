import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { HttpHeadersContext } from "../../context/HttpHeadersProvider";
import "../css/board_write.css"
import Button from "../../components/Button";
import React from "react";
import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
// import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

type AddImageBlobHook = (blob: Blob, callback: (url: string, alt: string) => void) => void;

export default function BoardUpdate() {
	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const location = useLocation();
	const { board } = location.state;
	const [title, setTitle] = useState(board.title);
	const [category, setCategory] = useState(board.category);
	const [content, setContent] = useState(board.content);

	const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	}
	const changeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
		setCategory(event.target.value);
	}
	const editorRef = useRef<Editor | null>(null);

	const handleEditorChange = () => {
		const editorInstance = editorRef.current!.getInstance();
		if (editorInstance) {
			setContent(editorInstance.getMarkdown());
		}
	};

	const handleImageUpload: AddImageBlobHook = async (blob, callback) => {
        const formData = new FormData();
        formData.append("image", blob);

        await axios.post("http://localhost:8888/file/image-upload", formData)
		.then((resp) => {
            // 서버로부터 받은 이미지 URL과 대체 텍스트를 콜백으로 전달하여 에디터에 이미지 삽입
            callback(resp.data, auth + "_img");
        } )
		.catch ((err) => {
			alert("이미지 용량이 너무 큽니다. 최대 5MB까지 업로드 가능합니다.");
            console.error("이미지 업로드 실패:", err);
            // 에러 처리 로직
        });
    };

	/* [POST /board]: 게시글 수정 */
	const updateBoard = async() => {
		// 입력창에 입력한 내용을 HTML 태그 형태로 취득
		console.log(editorRef.current?.getInstance().getHTML());
		// 입력창에 입력한 내용을 MarkDown 형태로 취득
		console.log(editorRef.current?.getInstance().getMarkdown());

		if (category === "") {
			alert("카테고리를 선택해주세요.");
			return
		}  else if (title.length === 0) {
			alert("제목을 입력해주세요.");
			return
		} else if (title.length <= 10) {
			alert("제목 10자 이상 입력해주세요.");
			return
		} else if (content.length === 0) {
			alert("내용을 입력해주세요.");
			return
		}

		const req = {
			email: auth, 
			title: title,
			content: editorRef.current?.getInstance().getHTML() || "",
			category: category, 
		}

		await axios.patch(`http://localhost:8888/board/${board.seq}`, req, { headers: headers })
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
		<div id='body'>
			<div className="containerBoard">
				<div className="form-valid">
					<div>
						<div className="mail-input">
							<select className="customSelect body16x" value={category} onChange={changeCategory} required>
								<option value="">카테고리를 선택해주세요</option>
								<option value="슬기로운 라이프">슬기로운 라이프</option>
								<option value="아름다운 음악">아름다운 음악</option>
								<option value="맛있는 요리">맛있는 요리</option>
								<option value="디자인 & 개발">디자인 & 개발</option>
								<option value="미술의 감성">미술의 감성</option>
								<option value="멋의 패션">멋의 패션</option>
								<option value="기타">기타</option>
							</select>
						</div>
						{/* <p className="message body14x"> {userEmailMessage} </p> */}
					</div>
					<div>
						<div className="mail-input">
							<input type="email" value={title} minLength={10} onChange={changeTitle} placeholder="제목을 입력해주세요" required />
						</div>
						{/* <p className="message body14x"> {userEmailMessage} </p> */}
					</div>

					<Editor
						ref={editorRef} // DOM 선택용 useRef
						placeholder="내용을 입력해주세요."
						previewStyle="vertical" // 미리보기 스타일 지정
						height="400px" // 에디터 창 높이
						initialEditType="wysiwyg" //위지윅, 마크다운 버전
						language="ko-KR"
						initialValue={content || ' '} // 글 수정 시 사용
						toolbarItems={[
						// 툴바 옵션 설정
						['heading', 'bold', 'italic', 'strike'],
						['hr', 'quote'],
						['ul', 'ol', 'task', 'indent', 'outdent'],
						['table', 'image', 'link'],
						['code', 'codeblock']
						]}
						onChange={handleEditorChange} // onChange 이벤트 핸들러를 설정
						useCommandShortcut={false} // 키보드 입력 컨트롤 방지
						hooks={{
							addImageBlobHook: handleImageUpload,
						}}
					></Editor>
				</div>

				<Button size="Large" onClick={updateBoard} className="BtnBoard">
					수정하기
				</Button>
			</div>
		</div>
		</>
	);
}