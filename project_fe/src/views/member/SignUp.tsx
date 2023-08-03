import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

import '../css/signup.css';
import Button from "../../components/Button";
import React from "react";

export default function SignUp() {
	
	// 사용자 정보
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [checkPwd, setCheckPwd] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	
	const navigate = useNavigate();

	// 유효성검사
  const [userEmail, setUserEmail] = useState<String>('');
  const [userPassword, setUserPassword] = useState<String>('');
  const [userPasswordCheck, setUserPasswordCheck] = useState<String>('');
  const [userNickname, setUserNickname] = useState<String>('');
  const [userPhoneNumber, setUserPhoneNumber] = useState<String>('');

  const [userEmailMessage, setUserEmailMessage] = useState<String>('');
  const [userPasswordMessage, setUserPasswordMessage] = useState<String>('');
  const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState<String>('');
  const [userNicknameMessage, setUserNicknameMessage] = useState<String>('');
  const [userPhoneNumberMessage, setUserPhoneNumberMessage] = useState<String>('');

  const [isUserEmail, setIsUserEmail] = React.useState(false);
  const [isUserPassword, setIsUserPassword] = React.useState(false);
  const [isUserPasswordCheck, setIsUserPasswordCheck] = React.useState(false);
  const [isUserNickname, setIsUserNickname] = React.useState(false);
  const [isUserPhoneNumber, setIsUserPhoneNumber] = React.useState(false);

	// 사용자 정보


	const onChangeUserEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const currentUserEmail = event.target.value;
    setEmail(currentUserEmail);
    const idRegEx = /^([a-zA-Z0-9]{4,20})@?([a-zA-Z0-9]{4,20}).?([a-zA-Z0-9]{2,6})$/;
    // abc@def.com  => abc => 4글자 이상 20글자 이하 // def => 4글자이상 20글자 이하 // com => 2글자이상 6글자이하  
    if(!idRegEx.test(currentUserEmail)){
      setUserEmailMessage("올바른 이메일주소를 입력해주세요.");
      setIsUserEmail(false);
    } else {
      setUserEmailMessage("");
      setIsUserEmail(true);
    }
		setEmail(event.target.value);
  };

  const onChangeNickName = (event: ChangeEvent<HTMLInputElement>) => {
    const currentUserNickName = event.target.value;
    setName(currentUserNickName);

    if(currentUserNickName.length < 2 || currentUserNickName.length > 6) {
      //이름은 2자이상 6자 미만 
      setUserNicknameMessage("이름은 2글자 이상 6글자 이하로 입력해주세요.");
      setIsUserNickname(false);
    } else {
      setUserNicknameMessage("");
      setIsUserNickname(true);
    }
		setName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const currentPassword = event.target.value;
    setPwd(currentPassword);
    const userPasswordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/;
    // 10,25 최소 10자리 최대 25자리
    if(!userPasswordRegExp.test(currentPassword)) {
      setUserPasswordMessage("숫자+영문자+특수문자 조합으로 10자리 이상 입력해주세요.");
      setIsUserPassword(false);
    } else {
      setUserPasswordMessage("");
      setIsUserPassword(true);
		}
  };

  const onChangePasswordCheck = (e: { target: { value: any; }; }) => {
    const currentPasswordCheck = e.target.value;
    setCheckPwd(currentPasswordCheck);
	
		if(pwd != currentPasswordCheck) {
			setUserPasswordCheckMessage("비밀번호가 일치 하지 않습니다.");
			setIsUserPasswordCheck(false);
		} else {
			setUserPasswordCheckMessage("");
			setIsUserPasswordCheck(true);
		}
	};

const onChangeUserPhoneNumber = (getNumber: any) => {
	const currentUserPhoneNumber = String(getNumber);
	setPhone(currentUserPhoneNumber);
	const userPhoneNumberRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
	// 1,6,7,8,9 중 하나 // 0-9 => 3글자 or 4글자 // 0-9 => 4글자  
	console.log(userPhoneNumberRegExp.test(currentUserPhoneNumber));

	if (!userPhoneNumberRegExp.test(currentUserPhoneNumber)) {
		setUserPhoneNumberMessage("올바른 형식이 아닙니다.");
		setIsUserPhoneNumber(false);
	} else if((userPhoneNumberRegExp.test(currentUserPhoneNumber)) ){
		setUserPhoneNumberMessage("");
		setIsUserPhoneNumber(true);
	}
	setPhone(getNumber);
};

const addHyphen = (event: { target: { value: any; }; }) => {
	const currentNumber = event.target.value;
	setUserPhoneNumber(currentNumber);
	if (currentNumber.length == 3 || currentNumber.length == 8) {
		setUserPhoneNumber(currentNumber + "-");
		// 01012345678 or 010-1234-5678 똑같이 해주는거 
		onChangeUserPhoneNumber(currentNumber + "-");
	} else {
		onChangeUserPhoneNumber(currentNumber);
	}
};

	/* 이메일 중복 체크 */
	const checkEmailDuplicate = async () => {
		await axios.get("http://localhost:8888/user", { params: { email: email } })
			.then((resp: { data: any; status: number; }) => {
				console.log(resp.data);
				if (resp.status === 200) {
					alert(email + "는 사용 가능한 이메일입니다.");
				}
			})
			.catch((err: { response: any; }) => {
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
			.then((resp: { data: any; }) => {
				console.log(resp.data);

				alert(name + "님 회원가입을 축하드립니다");
				navigate("/login");

			}).catch((err: { response: any; }) => {
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
			 	<div>
			 		<div className="mail-input">
			 			<input type="email" value={email} onChange={onChangeUserEmail} placeholder="이메일을 입력해주세요" required />
			 			<button className="btn btn-outline-danger" onClick={checkEmailDuplicate}><i className="fas fa-check"></i> 이메일 중복 확인</button>
			 		</div>
			 		<p className="message body14x"> {userEmailMessage} </p>
			 	</div>
			 	<div>
			 		<div className="pw-input">
			 			<input type="password" value={pwd} onChange={onChangePassword} name="password" placeholder="비밀번호를 입력해주세요" required />
			 		</div>
			 		<p className="message body14x">{userPasswordMessage}</p>
			 	</div>
			 	<div>
			 		<div className="pw-input">
			 			<input type="password" value={checkPwd} onChange={onChangePasswordCheck} name="password" placeholder="비밀번호 한번 더 입력해주세요" required />
			 		</div>
			 		<p className="message body14x">{userPasswordCheckMessage}</p>
			 	</div>
			 </div>
       {/* 이름 & 연락처 입력 */}
       <div className="form-valid">
			 	<div>
			 		<div className="mail-input">
			 			<input type="text" value={name} onChange={onChangeNickName} placeholder="이름을 입력해주세요" required />
			 		</div>
			 		<p className="message body14x">{userNicknameMessage}</p>
			 	</div>	
			 	<div>
			 		<div className="mail-input">
			 			<input type="text" value={phone} onChange={addHyphen} placeholder="휴대폰번호를 입력해주세요" required />
			 		</div>
			 		<p className="message body14x">{userPhoneNumberMessage}</p>									
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