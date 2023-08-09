import { ChangeEvent, useState } from 'react';
import '../css/modal.css';
import Button from '../../components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Donation() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  }

  const donated = () => {
    if (choiceVal === "") {
      alert("금액을 선택해주세요.");
    } else {
      alert(choiceVal + "원 기부 완료했습니다.");
      setIsOpen(false);
    }
  }

  const [choiceVal, setChoiceVal] = useState("all");
	const changeChoice = (event: ChangeEvent<HTMLSelectElement>) => { 
    const selectedValue = event.target.value;
    setChoiceVal(selectedValue);
  }

    return (
      <>
        <Button size='Large' onClick={openModal}>기부하기</Button>
        {isOpen && (
          <div className="modal">
            <div className="modalContent">
              {/* <div className='closeBox'>
                <div className='closeline'>
                  <div className="closeicon" onClick={closeModal}></div>
                </div>
              </div> */}
              <p className="titleModal title24x">기부안내</p>
              <p className="textModal body16x">기부하실 금액을 선택해주세요</p>
              <select value={choiceVal} onChange={changeChoice} className='modalBill'>
                <option value="">선택해주세요</option>
                <option value="1,000">1,000원</option>
                <option value="2,000">2,000원</option>
                <option value="3,000">3,000원</option>
                <option value="4,000">4,000원</option>
                <option value="5,000">5,000원</option>
                <option value="6,000">6,000원</option>
                <option value="7,000">7,000원</option>
                <option value="8,000">8,000원</option>
                <option value="9,000">9,000원</option>
                <option value="10,000">10,000원</option>
              </select>
              <div className='twoButton'>
                <Button size="Medium" className='close' onClick={closeModal}>취소</Button>
                <Button size="Medium" onClick={donated}>기부하기</Button>
              </div>
            </div>
          </div>
        )}
      </>
    )
}
