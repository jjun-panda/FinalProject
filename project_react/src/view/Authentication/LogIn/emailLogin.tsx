import React from 'react'
import Button from '../../../components/Button'
import './css/login.css'

export default function EmailLogin() {
    return (
      <>
        {/* <div className="check-wrap">
            <input className="id-checkbox form-check-input" type="checkbox" id="autoLogin_loginRequiredForm" data-save-btn="email" />
            <label htmlFor="autoLogin_loginRequiredForm" className="form-check-label text-gray600">아이디 저장</label>
        </div> */}
        <div className="login-submitBtn">
          <Button size="Medium">로그인</Button>
        </div>
      </>
    )
}
