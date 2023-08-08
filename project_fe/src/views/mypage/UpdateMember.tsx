import React, { useContext, useState } from 'react';
import '../css/modal.css';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface memberInfo {
	name : string;
  phone : string;
  email : string;
  pwd : string;
}

interface UpdateMemberProps {
  member: memberInfo;
}

export default function UpdateMember({ member }: UpdateMemberProps) {
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const cancelModal = () => {
    setIsOpen(false);
  };

  const [pwd, setPwd] = useState(member.pwd);
  const [name, setName] = useState(member.name);
  const [phone, setPhone] = useState(member.phone);
  const [newPwd, setNewPwd] = useState('');
  

  const updateMember = async () => { 
    
    const userData = {
      email: auth,
      pwd: pwd,
      newPwd: newPwd,
      name: name,
      phone: phone
    };
    // setIsOpen(false);
    await axios.post("http://localhost:8888/user/updateMember",  userData)
    
      .then((resp) => {
        console.log(resp.data);

        if (resp.data === 1) {
          alert("수정이 완료 되었습니다");
          navigate("/MyPageDetail")
        }

      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Button size='Large' onClick={openModal}>수정</Button>
      {isOpen && (
        <div className="modal">
          <div className="modalContent">
            <p className="titleModal title24x">회원정보 수정</p>

            <div className="form-valid">
              <div>
                <div className="mail-input">
                  <input type="email" name='email' value={auth} readOnly />
                </div>
              </div>
              <div>
                <div className="pw-input">
                  <input type="password" name="pwd" placeholder="기존 비밀번호를 입력해주세요" required onChange={e => setPwd(e.target.value)} />
                </div>
              </div>
              <div>
                <div className="pw-input">
                  <input type="password" name="newPwd" placeholder="새 비밀번호를 입력해주세요" required onChange={e => setNewPwd(e.target.value)} />
                </div>
              </div>
            </div>
            {/* 이름 & 연락처 입력 */}
            <div className="form-valid">
              <div>
                <div className="mail-input">
                  <input type="text" name='name' value={name} placeholder="이름을 입력해주세요" required onChange={e => setName(e.target.value)}/>
                </div>
              </div>
              <div>
                <div className="mail-input">
                  <input type="text" name='phone' value={phone} placeholder='핸드폰 번호를 입력해주세요' required onChange={e => setPhone(e.target.value)}/>
                </div>
              </div>
            </div>

            <Button size="Medium" onClick={cancelModal}>취소</Button>
            <Button size="Medium" onClick={updateMember}>확인</Button>
          </div>
        </div>
      )}
    </>
  )
}
