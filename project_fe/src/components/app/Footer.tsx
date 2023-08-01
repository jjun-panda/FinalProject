import { Link } from 'react-router-dom';
import '../css/Footer.css'
import React from 'react';

export default function Footer() {

    function clickme() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    
    return (
    <div className="footerContainer">
        <div className="footerMain">
            <div className="footerTop">
                <Link to='/'>
                    <img
                    src="https://jjundesign.gabia.io/components/jjun_logo_f.svg"
                    alt="logo"
                    width={100}
                />
                </Link>
                <div >
                    <svg
                    onClick={clickme}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 1024 1024"
                    height={40}
                    width={40}
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M1024 512C1024 229.216 794.768 0 512 0 229.216 0 0 229.216 0 512c0 282.768 229.216 512 512 512 282.768 0 512-229.232 512-512zm-960.992 0C63.008 264.976 264.976 64 512 64c247.024 0 448 200.976 448 448S759.024 960 512 960 63.008 759.024 63.008 512zm481.328 224.32V375.856l115.76 115.76c12.496 12.496 32.752 12.496 45.248 0s12.496-32.752 0-45.248l-194-189.008-194 189.008c-6.256 6.256-9.376 14.432-9.376 22.624s3.12 16.368 9.376 22.624c12.496 12.496 32.752 12.496 45.248 0l117.744-117.76V736.32c0 17.68 14.336 32 32 32s32-14.32 32-32z"></path>
                    </svg>
                </div>
            </div>
            <div className="footerMain">
                <div className="footerLeft">
                    <div className="menuList">
                        <a href=""><p className='body14x'>브랜드 소개</p></a>
                        <a href=""><p className='body14x'>서비스 소개</p></a>
                        <a href=""><p className='body14x'>사용자 이용 약관</p></a>
                        <a href=""><p className='bodyB14x'>개인정보 처리방침</p></a>
                        <a href=""><p className='body14x'>자주 묻는 질문</p></a>
                        <a href=""><p className='body14x'>1:1 문의하기</p></a>
                    </div>
                    <div className="teamInfo">
                        <p className='body12x'>
                            <span style={{fontWeight: '500'}}>공동대표</span> 최준석, 서민경, 서형원, 임명철, 최승현
                        </p>
                        <p className='body12x'>
                            <span style={{fontWeight: '500'}}>개인정보보호책임자</span> 최준석
                        </p>
                        <p className='body12x'>
                            <span style={{fontWeight: '500'}}>사업자번호</span> 223-08-00001
                        </p>
                        <p className='body12x'>
                            <span style={{fontWeight: '500'}}>통신판매업</span> 2023-경기성남-0811호
                        </p>
                        <p className='body12x'>
                            <span style={{fontWeight: '500'}}>주소</span> 경기도 성남시 수정구 창업로 54 (판교제2테크노밸리기업성장센터)
                        </p>
                    </div>
                    <div className="footerBottom">
                        <p className='body14x'>©2023 Team InnoCo. All Rights Reserved.</p>
                    </div>
                </div>

                <div className="footerRight">
                    <div className="contact">
                        <p className='bodyB14x'>고객 문의</p>
                        <p className='bodyB24x'>2023-0811</p>
                        <p className='body14x'>
                        09:00 - 18:00 <span style={{fontWeight: '500'}}>주말, 공휴일 포함</span>
                        </p>
                        <a href="mailto:help@innoco.com"><p>help@innoco.com</p></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
