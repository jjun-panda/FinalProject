import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import '../css/Header.css';
import axios from "axios";

interface MyPage {
	name : string;
    phone : string;
    email : string;
    pwd : string;
}

export default function Header() {
	const { auth, setAuth } = useContext(AuthContext);
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		setDarkMode(prefersDark.matches);

		const handleChangeDarkMode = (event: MediaQueryListEvent) => {
		setDarkMode(event.matches);
		};
		prefersDark.addEventListener('change', handleChangeDarkMode);

		return () => {
		prefersDark.removeEventListener('change', handleChangeDarkMode);
		};
	}, []);

	const [memberInfo, setMemberInfo] = useState<MyPage>({} as MyPage);

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

	return (
		<div className="nav">
			<div className="container">
				<div className="gridHeader header">
					<Link to="/">
						<span className="logoText caption">즐겨라, 혁신과 공존 함께!</span>
						<p className={`logoImg ${darkMode ? 'dark-mode' : ''}`} />
							{/* <img src={logoImg} alt="logo"  height={24}/> */}
					</Link>
					<ul className="menu">

					{							
						(auth) ?
							<>
								{
									(localStorage.getItem("email") === "admin") ?
									<>
										<Link className="bodyB14x admin box" to="/user/detail" >관리자 모드</Link>	
									</>
									:
									<>
										{/* 회원 정보 */}
										<span className="body18x">{memberInfo.name} 님</span>
										<span>|</span>

										{/*마이페이지 */}
										{/* <Link className="bodyB14x userPageBtn" to="/user/detail" >마이페이지</Link> */}
										<Link className="usericon" to="/user/detail" title="마이페이지"></Link>
										<Link className="logouticon" to="/logout" title="로그아웃"></Link>

										{/* 로그아웃 */}
										{/* <Link className="body16x" to="/logout">로그아웃</Link> */}
									</>
								}

								
								
							</>
							:
							<>
								{/* 로그인 / 회원가입 */}
								<Link className="body16x" to="/login">로그인</Link>
								<span>/</span>
								<Link className="body16x" to="/signup">회원가입</Link>
							</>
					}

					</ul>
				</div>
			</div>
		</div>
	)
}
