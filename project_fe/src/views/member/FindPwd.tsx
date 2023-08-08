import { useEffect, useState } from 'react';
import '../css/login.css'
import '../css/modal.css';
import Button from '../../components/Button';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FindPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const cancelModal = () => {
    setIsOpen(false);
  };

  const [email, setEmail] = useState('');
	let navigate = useNavigate();

	const checkPassword = async () => {
    if (email.length === 0) {
      alert("이메일을 입력해주세요.");
      return;
    }

		await axios.get("http://localhost:8888/user", { params: { email: email } })
		.then((resp: { data: any; status: number; }) => {
			console.log(resp.data);
      alert("[" + email +'] 메일을 확인해주세요');
      navigate('/');
		})
		.catch((err: { response: any; }) => {
			console.log(err);
			const resp = err.response;
		});
	}

  

  return (
    <>
      <a role="button" className="body14x" onClick={openModal} title="비밀번호 찾기">비밀번호 찾기</a>
      {isOpen && (
        <div className="modal">
          <div className="modalContent">
            <p className="titleModal title24x">비밀번호 찾기</p>
            <p className="textModal body16x">가입하신 이메일을 입력하시면, <br />비밀번호 변경 메일을 발송해드립니다.</p>
            <input
              className='modalPassword'
              type="email"
              value={email}
              minLength={1}
              placeholder="가입하신 이메일을 입력해주세요"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button size="Medium" onClick={checkPassword}>이메일 전송</Button>
          </div>
        </div>
      )}
    </>
  )
}
