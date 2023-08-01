import React from "react";
import "../css/mypage_detail.css"


function MyPageDetail() {
    const goToRecord = () => {
        window.location.href = "record.html"
    };
    const goToOut = () => {
        window.location.href = "out.html"
    };
    return (
        <div>
            {/* 상단 로그 div */}
            <div className="nav">
                <div className="gridHeader">
                    <a href="/">
                        <div className="logo title24x">
                            <img src="?" alt="logo" width={100} />
                        </div>
                    </a>
                </div>
            </div>
            {/* 회원 정보 표시 */}
            <div className="top01">
                <div className="top02">
                    <div className="containerBody1">
                        <div className="imgfile">
                            <img src="/pro.png" alt="MyImage" />
                        </div>
                        <div className="saram1">
                            <p>Name  : 미정</p>
                            <p>Phone Number : 010-1111-9999</p>
                            <p>Email : aaa@aaa.com</p><br />
                            <div className="btn1">
                                <input type="button" value={"수정하기"} onClick={(e) => {
                                    alert("회원수정 페이지로 이동")
                                }} />
                                <input type="button" value={"회원탈퇴"} onClick={(e) => {
                                    alert("정말 회원 탈퇴 하시겠습니까?")
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="btn2">
                        <input className="btn_input" type="button" value={"기부 내역"} onClick={goToRecord} />
                        <div className="containerBody2">
                            <div className="saram2">
                                <p>기부 받은 금액</p>

                                <input type="button" value={"출금하기"} onClick={goToOut} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <hr /><hr />
            
        </div>
        

    );
}
export default MyPageDetail;