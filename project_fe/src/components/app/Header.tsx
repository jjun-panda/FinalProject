import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import '../css/Header.css';


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
								{/* 회원 정보 */}
								{
									(localStorage.getItem("email") === "admin") ?
									<>
										<span className="body14x admin box">관리자 모드</span>	
									</>
									:
									<>
										<span className="body16x">{auth}님 반갑습니다</span>	
									</>
								}

								{/*마이페이지 */}
								<Link className="bodyB14x" to="/user/detail" >마이페이지</Link>
								{/* <span>/</span> */}

								{/* 로그아웃 */}
								{/* <Link className="body16x" to="/logout">로그아웃</Link> */}
								
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
