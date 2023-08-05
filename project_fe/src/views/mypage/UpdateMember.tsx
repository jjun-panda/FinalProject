import { useContext, useState } from 'react';
import '../css/modal.css';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { HttpHeadersContext } from '../../context/HttpHeadersProvider';

export default function UpdateMember() {
  //const { headers, setHeaders } = useContext(HttpHeadersContext);
  const { auth, setAuth } = useContext(AuthContext);



  const navigate = useNavigate();
  
  // const location = useLocation();
  // const { member } = location.state;

  // const [pwd, setPwd] = useState(member.pwd);
  // const [name, setName] = useState(member.name);
  // const [phone, setPhone] = useState(member.phone);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const cancelModal = () => {
    setIsOpen(false);
  };

  const [pwd, setPwd] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  

 

  const updateMember = async () => { 
    
    const userData = {
      email: auth,
      pwd,
      name,
      phone
    };
    setIsOpen(false);
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
                <div className="pw-input">
                  <input type="password" name="pwd" placeholder="비밀번호를 입력해주세요" required onChange={e => setPwd(e.target.value)} />
                </div>
              </div>
            </div>
            {/* 이름 & 연락처 입력 */}
            <div className="form-valid">
              <div>
                <div className="mail-input">
                  <input type="text" name='name' placeholder="이름을 입력해주세요" required onChange={e => setName(e.target.value)}/>
                </div>
              </div>
              <div>
                <div className="mail-input">
                  <input type="text" name='phone' placeholder='핸드폰 번호를 입력해주세요' required onChange={e => setPhone(e.target.value)}/>
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
