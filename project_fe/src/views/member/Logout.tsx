import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import Button from "../../components/Button";
import successIcon from '../../assets/images/icon/ico_success_line.svg'
import '../css/modal_mini.css'

export default function Logout() {

	const { auth, setAuth } = useContext(AuthContext);

	const [isOpen, setIsOpen] = useState(false);
    
	const openModal = () => {
        setIsOpen(true);
    };
	
	const navigate = useNavigate();

	useEffect(() => {
		openModal();
		localStorage.removeItem("board_access_token");
		localStorage.removeItem("email");
		setAuth(null);
	})

	const logout = () => {
		navigate("/");
	};


	return (
		<>
			<div className="modal_mini">
				<div className="modalContent">
					<img src={successIcon} alt="성공 아이콘" />
					<p className="titleModal title24x">로그아웃 완료</p>
					<p className="textModal body16x">다음에 또 만나요!</p>
					<Button size="Medium" onClick={logout}>확인</Button>
				</div>
			</div>
		</>
	)
}