import axios from "axios";
import { useState, useContext, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import { HttpHeadersContext } from "../../context/HttpHeadersProvider";
import { Link } from 'react-router-dom';
import warningIcon from '../../assets/images/icon/ico_warning_line.svg'
import '../css/user_delete.css';
import '../css/modal.css';
import Button from "../../components/Button";
import React from "react";
import successIcon from '../../assets/images/icon/ico_success_line.svg'

interface MyPage {
	name : string;
    phone : string;
    email : string;
    pwd : string;
}

export default function UserDelete() {
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };

	useEffect(() => {
		if (isOpen) {
			document.body.style.height = "100vh";
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.height = "auto";
			document.body.style.overflow = "visible";
		}
		
		return () => {
			document.body.style.height = "auto";
			document.body.style.overflow = "visible";
		};
	}, [isOpen]);

	const [memberInfo, setMemberInfo] = useState<MyPage>({} as MyPage);

    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

	const cancelMemberDelete = () => {
        navigate(-1); // 뒤로 페이지로 이동
    }
	
	const byeService = () => {
		setIsDeleted(false);
		localStorage.removeItem("board_access_token");
		localStorage.removeItem("email");
		setAuth(null);
		navigate("/");
	}
    const deleteMember = async () => {
		if (!isChecked) {
			alert('동의하셔야 탈퇴가 가능합니다.');
			return;
		}
		await axios.delete("http://localhost:8888/user/deleteMember", { params: { "email": auth } })
        .then((resp) => {
			console.log(resp.data);

            if (resp.data === 1) {
                openModal();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		setDarkMode(prefersDark.matches);

		const handleChangeDarkMode = (event: MediaQueryListEvent) => {
		setDarkMode(event.matches);
		};
		prefersDark.addEventListener('change', handleChangeDarkMode);

		return () => {
		prefersDark.removeEventListener('change', handleChangeDarkMode);
		};
	}, []);


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
			<div id="resignRequired">
				<div id="resignRequiredForm" className="resignForm">

						{/* 타이틀 */}
						<div className="titleWrap">
							<Link to="/">
								<div className="logo">
									<p className={`logoImg ${darkMode ? 'dark-mode' : ''}`} />
								</div>
							</Link>
							<div className="bodyB32x resignTit">
								<span className="bodyB32x point">{memberInfo.name}</span> 님! <br/>정말로 탈퇴 하시겠어요?
							</div>
						</div>

						<div className="form-valid">
							<div className="resignInput">
								<div className="warning">
									<img src={warningIcon} alt="" />
									<p className="bodyB16x">회원 탈퇴를 신청하기 전에 <br/>아래의 유의사항을 확인해주세요.</p>
								</div>
								<ul className='body14x'>
									<li>탈퇴 후에는 작성하신 게시글, 댓글을 수정 혹은 삭제하실 수 없어요. 탈퇴 신청 전에 꼭 확인해주세요.</li>
									<li>전자상거래법에 의해 보존해야하는 거래기록은 5년간 보관돼요.</li>
									<li>탈퇴 후 7일간 다시 재가입할 수 없어요.</li>
								</ul>
							</div>
						</div>
						<div className="form-checkbox">
							<label>
								<input 
									type="checkbox" 
									className="checkBox" 
									checked={isChecked}
									onChange={(e) => setIsChecked(e.target.checked)}			
								/>
								<em />
								<span className="checkbox16x">유의사항을 모두 확인했으며 동의합니다.</span>
							</label> 
						</div>                   

						<div className="resignLinkWrap">
							<Button size="Large" onClick={cancelMemberDelete}>취소</Button>
							<Button size="Large" onClick={deleteMember}>확인</Button>
						</div>
						{isOpen && (
							<div className="modal">
								<div className="modalContent">
									<img src={successIcon} alt="성공 아이콘" />
									<p className="titleModal title24x">회원탈퇴 완료</p>
									<p className="textModal body16x">서비스를 사용해주셔서 감사합니다.</p>
									<Button size="Medium" onClick={byeService}>확인</Button>
								</div>
							</div>
						)}
				</div>
			</div>
		</>
	);
}