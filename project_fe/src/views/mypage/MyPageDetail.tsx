import React, { useEffect, useState, useContext  } from "react";
import "../css/mypage_detail.css"
import MyContents from './MyContents';
import "../css/contents_mypage.css"
import Button from "../../components/Button";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import DeleteMember from "./DeleteMember";
import UpdateMember from "./UpdateMember";

interface MyPage {
	name : string;
    phone : string;
    email : string;
    pwd : string;
}

function MyPageDetail() {
    const [memberInfo, setMemberInfo] = useState<MyPage>({} as MyPage);
    const { auth, setAuth } = useContext(AuthContext);

    console.log(memberInfo.name);
	/* 멤버 정보 불러오기 */
	const getMemberInfo = async (email: string) => {

		await axios.get("http://localhost:8888/user/getMemberInfo", { params: {"email": auth  }})
			.then((resp) => {
				console.log(resp.data);

				setMemberInfo(resp.data);
			})
			.catch((err) => {
				console.log(err);

			});
	}



	useEffect(() => {
		getMemberInfo("");
	}, []);

    const goToRecord = () => {
        window.location.href = "record.html"
    };
    const goToOut = () => {
        window.location.href = "out.html"
    };

    const goToBoardWrite = () => {
        window.location.href = "/board/write" //글쓰기 버튼 클릭시 이동
    };

    return (
        <>
            {/* 회원 정보 표시 */}
            <div className="top01">
                <div className="top02">
                    <div className="containerBody1">
                        <div className="imgfile">
                            <img src="/pro.png" alt="MyImage" />
                        </div>
                        <div className="saram1">
                            <p>Name  : {memberInfo.name}</p>
                            <p>Phone Number : {memberInfo.phone}</p>
                            <p>Email : {memberInfo.email}</p><br />
                            <div className="btn1">
                                < UpdateMember />
                                < DeleteMember />
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
            <hr />
            <div id='contentsMypageTum'>
                <p className="title24x contentsTitle">내 게시글</p>
                <Button size="Small" onClick={goToBoardWrite}>글 추가</Button>
                <MyContents />
            </div>
            
          
            
        </>
        

    );
}
export default MyPageDetail;