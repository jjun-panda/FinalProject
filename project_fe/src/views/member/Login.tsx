import axios from "axios";
import { useState, useContext, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import { HttpHeadersContext } from "../../context/HttpHeadersProvider";
import { Link } from 'react-router-dom';

import '../css/login.css';
import '../css/modal.css';
import Button from "../../components/Button";
import FindPassword from "./FindPwd";
import SNSLogin from "./SNSLogin";
import Terms from "./SNSInfo";
import React from "react";

export default function Login() {

	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");

	const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	}

	const changePwd = (event: ChangeEvent<HTMLInputElement>) => {
		setPwd(event.target.value);
	}

	const login = async () => {

		const req = {
			email: email,
			pwd: pwd,
		}

		await axios.post("http://localhost:8888/user/login", req)
		.then((resp) => {
			console.log("[Login.js] login() success :D");
			console.log(resp.data);

				alert(resp.data.email + "님, 로그인 되었습니다");

				// JWT 토큰 저장
				localStorage.setItem("board_access_token", resp.data.jwt);
				localStorage.setItem("email", resp.data.email);

				setAuth(resp.data.email); // 사용자 인증 정보(이메일 저장)
				setHeaders({"Authorization": `Bearer ${resp.data.jwt}`}); // 헤더 Authorization 필드 저장

				navigate("/board/list");
			

		}).catch((err) => {
			console.log("[Login.js] login() error :<");
			console.log(err);

			alert("⚠️ " + err.response.data);
		});
	}

	return (
		<>
		<div id="loginRequired">
			<div className="">
			<div id="loginRequiredForm" className="loginForm">
				
				{/* 타이틀 */}
				<div className="titleWrap">
					<Link to="/"> 
						<div className="mobile-logo">
						<img src="https://jjundesign.gabia.io/components/jjun_logo_f.svg" alt="logo"  width={150}/>
						</div>
					</Link>
					<div className="bodyB32x">
						만나서 반가워요!
					</div>
					<div className="body16x">
						서비스 이용을 위해 로그인이 필요해요.
					</div>
					</div>

					{/* 이메일 로그인 */}
					<div className="form-valid">
					<div className="mail-input">
						<input type="email" value={email} onChange={changeEmail} placeholder="이메일을 입력해주세요" required />
					</div>
					<div className="pw-input">
						<input type="password" value={pwd} onChange={changePwd} name="password" placeholder="비밀번호를 입력해주세요" required />
					</div>
				</div>
				<div className="login-submitBtn">
					<Button size="Medium" onClick={login} >로그인</Button>
				</div>
				
				{/* 비밀번호 및 회원가입 링크  */}
				<div className="loginLinkWrap">
				<div className="findPw">
					<FindPassword/>
				</div>
				<div className="signUp">
					<span className='body14x'>회원이 아니신가요?</span>
					<Link role="button" className="bodyB14x" title="회원가입 하기" to='/signup'>회원가입 하기</Link>
				</div>
				</div>

				{/* SNS 로그인 */}
				<SNSLogin />

				{/* 개인정보 동의 문구 */}
				<Terms />
			</div>
			</div>
		</div>
		</>
	);
}