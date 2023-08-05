import { useContext, useState } from 'react';
import '../css/modal.css';
import Button from '../../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

export default function DeleteMember() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const cancelModal = () => {
    setIsOpen(false);
  };



  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const deleteMember = async () => {

    await axios.delete("http://localhost:8888/user/deleteMember", { params: { "email": auth } })
      .then((resp) => {
        console.log(resp.data);

        if (resp.data == 1) {
          alert("회원을 탈퇴 했습니다");
          navigate("/logout");
        }
        setIsOpen(false);
      }).catch((err) => {
        console.log(err);
      });

  }



  interface MyPage {
    name: string;
    phone: string;
    email: string;
    pwd: string;
  }


  return (
    <>
      <Button size='Large' onClick={openModal}>탈퇴</Button>
      {isOpen && (
        <div className="modal">
          <div className="modalContent">
            <p className="titleModal title24x">정말 회원 탈퇴 하시겠습니까?</p>

            <Button size="Medium" onClick={cancelModal}>취소</Button>
            <Button size="Medium" onClick={deleteMember}>확인</Button>
          </div>
        </div>
      )}
    </>
  )
}
