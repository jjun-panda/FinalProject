import { useState } from 'react';
import './css/login.css'
import Button from '../../../components/Button';
import './css/modal.css';

export default function FindPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const cancelModal = () => {
    setIsOpen(false);
  };

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
                minLength={1} 
                placeholder="가입하신 이메일을 입력해주세요" 
                required 
              />
              <Button size="Medium" onClick={cancelModal}>이메일 전송</Button>
            </div>
          </div>
        )}
      </>
    )
}
