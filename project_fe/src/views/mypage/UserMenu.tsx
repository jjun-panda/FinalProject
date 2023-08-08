import React, { useEffect, useState, useContext  } from "react";
import "../css/contents_mypage.css"
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import user from "../../assets/images/user.svg"
import "../css/user_page.css"

interface MyPage {
	name : string;
    phone : string;
    email : string;
    pwd : string;
}

export default function UserMenu() {

    const [memberInfo, setMemberInfo] = useState<MyPage>({} as MyPage);
    const { auth, setAuth } = useContext(AuthContext);

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
    
    const Undefined = async() => {
		alert("서비스 준비중입니다. 조마간 더 좋은 모습으로 돌아오겠습니다.");	
    }
    return (
        <>
            <div className="navigatorMain">
                <div className="navigatorWrapper">
                    <div className="profilBox">
                        <img src={user} alt="프로필 사진" />
                        <p className="naviTitle bodyB24x">{memberInfo.name} 님</p>
                        <p>{memberInfo.email}</p>
                        <p>{memberInfo.phone}</p>
                    </div>
                    <ul className="naviator">
                        <li className="menuWrapper">
                            <Link className="menu body18x" to="/user/detail">나의 게시물</Link>
                        </li>
                        <li className="menuWrapper">
                            <Link className="menu body18x" onClick={Undefined} to="#">기부 내역</Link>
                        </li>
                        <li className="menuWrapper">
                            <Link className="menu body18x" onClick={Undefined} to="#">출금하기</Link>
                        </li>
                        <hr />
                        <li className="menuWrapper">
                            <Link className="menu body18x" to="/user/update">회원정보 수정</Link>
                        </li>
                        <li className="menuWrapper">
                            <Link className="menu body18x" to="/logout">로그아웃</Link>
                        </li>
                        <li className="menuWrapper">
                            <Link className="menu body18x" to="/user/delete">회원탈퇴</Link>
                        </li>
                    </ul>
                </div>
			</div>
        </>
    )
}
