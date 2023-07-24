import React from 'react'
import kakaoIcon from '../../../assets/images/sns_kakao.svg'
import naverIcon from '../../../assets/images/sns_naver.svg'
import googleIcon from '../../../assets/images/sns_google.svg'
import { Link } from 'react-router-dom'

export default function SNSLogin() {
    return (
        <>
            <div className='loginHrContainer'>
                <div className='loginHr'></div>
                <p className='caption'>또는</p>
                <div className='loginHr'></div>
            </div>
            <div id='snsLogin'>
                {/* <div className='snsTitle'>
                    <p className='body16x'>SNS 간편 로그인</p>
                </div> */}
                <div className="snsBtn">
                    <Link to='#' className='naverBtn' ><img src={naverIcon} alt="네이버 로고" /><p className='button16x'>네이버 로그인</p></Link>
                    <Link to='#' className='kakaoBtn' ><img src={kakaoIcon} alt="카카오 로고" /><p className='button16x'>카카오 로그인</p></Link>
                    {/* <Link to='#' className='googleBtn'><img src={googleIcon} alt="구글 로고"  /></Link> */}
                </div>
            </div>
        </>
    )
}
