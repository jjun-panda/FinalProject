import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

import '../css/signup.css';
import Button from "../../components/Button";
import React from "react";

export default function SignUp() {

	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [checkPwd, setCheckPwd] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");

	const navigate = useNavigate();

	const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	}

	const changePwd = (event: ChangeEvent<HTMLInputElement>) => {
		setPwd(event.target.value);
	}

	const changeCheckPwd = (event: ChangeEvent<HTMLInputElement>) => {
		setCheckPwd(event.target.value);
	}

	const changeName = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	}

	const changePhone = (event: ChangeEvent<HTMLInputElement>) => {
		setPhone(event.target.value);
	}

	/* 이메일 중복 체크 */
	const checkEmailDuplicate = async () => {

		await axios.get("http://localhost:8888/user", { params: { email: email } })
			.then((resp) => {
				console.log(resp.data);

				if (resp.status === 200) {
					alert(email + "는 사용 가능한 이메일입니다.");
				}
				
			})
			.catch((err) => {
				console.log(err);

				const resp = err.response;
				if (resp.status === 400) {
					alert(resp.data);
				}
			});

	}

	/* 회원가입 */
	const signup = async () => {

		const req = {
			email: email,
			name: name,
			pwd: pwd,
			checkPwd: checkPwd,
			phone: phone
		}

		await axios.post("http://localhost:8888/user/signup", req)
			.then((resp) => {
				console.log(resp.data);

				alert(name + "님 회원가입을 축하드립니다");
				navigate("/login");

			}).catch((err) => {
				console.log(err);

				// alert(err.response.data);

				const resp = err.response;
				if (resp.status === 400) {
					alert(resp.data);
				}
			});
	}


	return (
		<>
		<div id="signupRequired">
            <div id="signupRequiredForm" className="signupForm">
                
                {/* 타이틀 */}
                <div className="titleWrap">
                <Link to="/">
                    <div className="mobile-logo">
                    <img src="https://jjundesign.gabia.io/components/jjun_logo_f.svg" alt="logo"  width={150}/>
                    </div>
                </Link>
                <div className="bodyB32x">
                    처음 오셨나요?
                </div>
                <div className="body16x">
                    회원가입 시 모든 서비스를 이용하실 수 있어요!
                </div>
                </div>

                {/* 이메일 & 비밀번호 입력 */}
                <div className="form-valid">
                    <div className="mail-input">
						<input type="email" value={email} onChange={changeEmail} placeholder="이메일을 입력해주세요" required />
                        <button className="btn btn-outline-danger" onClick={checkEmailDuplicate}><i className="fas fa-check"></i> 이메일 중복 확인</button>
                    </div>
                    <div className="pw-input">
                        <input type="password" value={pwd} onChange={changePwd} name="password" placeholder="비밀번호를 입력해주세요" required />
                    </div>
                    <div className="pw-input">
                        <input type="password" value={checkPwd} onChange={changeCheckPwd} name="password" placeholder="비밀번호 한번 더 입력해주세요" required />
                    </div>
                </div>
                {/* 이름 & 연락처 입력 */}
                <div className="form-valid">
                    <div className="mail-input">
                        <input type="text" value={name} onChange={changeName} placeholder="이름을 입력해주세요" required />
                    </div>
                <div className="mail-input">
					<input type="text" value={phone} onChange={changePhone} placeholder="휴대폰번호를 입력해주세요" required />
                </div>
                </div>
                <div className="signup-submitBtn">
                    <Button size="Medium" onClick={signup}>회원가입</Button>
                </div>
                
                {/* 비밀번호 및 회원가입 링크  */}
                <div className="signupLinkWrap">
                    <div className="logIn">
                        <span className='body14x'>이미 회원이신가요?</span>
                        {/* <a role="button" className="bodyB14x" onClick={() => setAuthView(false)} title="로그인 하기">로그인 하기</a> */}
                        <Link role="button" className="bodyB14x" title="로그인 하기" to='/login'>로그인 하기</Link>
                    </div>
                </div>
            </div>
		</div>
		</>
	);
}