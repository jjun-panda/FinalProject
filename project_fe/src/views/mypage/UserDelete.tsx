import { useContext, useState } from 'react';
import '../css/modal.css';
import Button from '../../components/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import React from 'react';

export default function UserDelete() {
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


  return (
    <>
      <Link className="menu body18x" to="" onClick={openModal}>회원탈퇴</Link>
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
