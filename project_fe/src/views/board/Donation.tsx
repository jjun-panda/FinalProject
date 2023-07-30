import { useState } from 'react';
import '../css/modal.css';
import Button from '../../components/Button';
import React from 'react';

export default function Donation() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const cancelModal = () => {
    setIsOpen(false);
  };

    return (
      <>
        <Button size='Large' onClick={openModal}>기부하기</Button>
        {isOpen && (
          <div className="modal">
            <div className="modalContent">
              <p className="titleModal title24x">기부안내</p>
              <p className="textModal body16x">기부하실 금액을 선택해주세요</p>
              <select name="" id="" className='modalBill'>
                <option selected>선택해주세요</option>
                <option value="1000">1,000원</option>
                <option value="2000">2,000원</option>
                <option value="3000">3,000원</option>
                <option value="4000">4,000원</option>
                <option value="5000">5,000원</option>
                <option value="6000">6,000원</option>
                <option value="7000">7,000원</option>
                <option value="8000">8,000원</option>
                <option value="9000">9,000원</option>
                <option value="10000">10,000원</option>
              </select>
              <Button size="Medium" onClick={cancelModal}>기부하기</Button>
            </div>
          </div>
        )}
      </>
    )
}
