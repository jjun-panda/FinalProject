import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import '../css/Header.css';
import React from "react";


export default function Header() {
	const { auth, setAuth } = useContext(AuthContext);

	return (
		<div className="nav">
			<div className="container">
				<div className="gridHeader header">
					<Link to="/">
						<div className="logo title24x">
						<img src="https://jjundesign.gabia.io/components/jjun_logo_f.svg" alt="logo"  width={100}/>
						</div>
					</Link>
					<ul className="menu">

					{							
						(auth) ?
							<>
								{/* 회원 정보 */}
								<li className="nav-item">
									<span className="nav-link"> {auth} 님 반갑습니다 <i className="fab fa-ello"></i> &nbsp; </span>
								</li>

								{/* 로그아웃 */}
								<li className="nav-item">
									<Link className="nav-link" to="/logout"><i className="fas fa-sign-out-alt"></i> 로그아웃</Link>
								</li>
							</>
							:
							<>
								{/* 로그인 / 회원가입 */}
								<li className="nav-item">
									<Link className="nav-link" to="/login">로그인</Link>
									<span style={{padding: '0 .25rem'}}>/</span>
									<Link className="nav-link" to="/signup">회원가입</Link>
								</li>
							</>
					}

					</ul>
				</div>
			</div>
		</div>
	)
}
