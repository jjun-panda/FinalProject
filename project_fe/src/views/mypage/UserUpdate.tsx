import React, { useEffect, useState, useContext, ChangeEvent  } from "react";
import "../css/contents_mypage.css"
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/images/user.svg"
import "../css/user_page.css"
import Button from "../../components/Button";
import UserDelete from "./UserDelete";

interface MyPage {
	name : string;
    phone : string;
    email : string;
    pwd : string;
}

export default function UserUpdate() {
    const item_page = 9;

    const [memberInfo, setMemberInfo] = useState<MyPage>({} as MyPage);
    const { auth, setAuth } = useContext(AuthContext);

    // Paging
	const [page, setPage] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);

    	// Link 용 (함수) 
	let navigate = useNavigate();
    

	const location = useLocation();

	useEffect(() => {
		if (location.state?.gotoTop) {
			window.scrollTo(0, 0);
		}
	}, [location]);

	const changePage = (page: number) => {
		setPage(page);
		navigate("/board/list", { state: { gotoTop: true } });
	}

	/* 멤버 정보 불러오기 */
	const getMemberInfo = async (email: string) => {

		await axios.get("http://localhost:8888/user/getMemberInfo", { params: {"email": email  }})
			.then((resp) => {
				console.log(resp.data);

				setMemberInfo(resp.data);
			})
			.catch((err) => {
				console.log(err);

			});
	}

	useEffect(() => {
		getMemberInfo(auth);
	}, [auth]);

    return (
        <>
        <div id="body">
			<div id='contentsUserTum'>
				<div className="navigatorMain">
					<div className="navigatorWrapper">
                        <img src={user} alt="프로필 사진" />
						<p className="naviTitle bodyB24x">{memberInfo.name} 님</p>
                        <p>{memberInfo.phone}</p>
                        <p>{memberInfo.email}</p>
                        <ul className="naviator">
							<li className="menuWrapper">
								<Link className="menu body18x" to="/user/detail">나의 게시물</Link>
							</li>
                            <li className="menuWrapper">
								<Link className="menu body18x" to="#">기부 내역</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x" to="#">출금하기</Link>
							</li>
                            <hr />
                            <li className="menuWrapper">
								<Link className="menu body18x" to="/user/update">회원정보 수정</Link>
							</li>
							<li className="menuWrapper">
								<Link className="menu body18x" to="/logout">로그아웃</Link>
							</li>
							<li className="menuWrapper">
                                < UserDelete />							
                            </li>
						</ul>
						<Link className="writeBtn" to="/board/write">글쓰기</Link>
					</div>
				</div>
				<div className="boardBox">
					<div id='contentsHeader'>
						<div>
							<p className="title24x">회원정보 수정</p>
							<p className="body16x">회원님께서 가입하신 정보입니다</p>
						</div>
					</div>

					<div id='contentsUser'>
						<div className="contentsGroup">
								<UpdateMember member={memberInfo} />
						</div>
					</div>
				</div>
			</div>
		</div>
        </>
    );
}

interface memberInfo {
	name : string;
    phone : string;
    email : string;
    pwd : string;
}

interface UpdateMemberProps {
    member: memberInfo;
}

function UpdateMember({ member }: UpdateMemberProps) {
    const { auth, setAuth } = useContext(AuthContext); //여기부터 추가됨. auth부분은 사용자의 인증 상태를 나타내는 변수
    
    const navigate = useNavigate();

    // 모달 팝업
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const cancelModal = () => {
        setIsOpen(false);
    };

    const [name, setName] = useState(member.name);
    const [phone, setPhone] = useState(member.phone);
    const [pwd, setPwd] = useState(member.pwd);
    const [newPwd, setNewPwd] = useState('');
    
    // 유효성검사
    const [userPasswordCheck, setUserPasswordCheck] = useState<String>('');
    const [userNewPasswordCheck, setUserNewPasswordCheck] = useState<String>('');
    const [userNickname, setUserNickname] = useState<String>('');
	const [userPhoneNumber, setUserPhoneNumber] = useState<String>('');

	const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState<String>('');
	const [userNewPasswordCheckMessage, setUserNewPasswordCheckMessage] = useState<String>('');
	const [userNicknameMessage, setUserNicknameMessage] = useState<String>('');
	const [userPhoneNumberMessage, setUserPhoneNumberMessage] = useState<String>('');

	const [isUserPasswordCheck, setIsUserPasswordCheck] = React.useState(false);
	const [isUserNewPasswordCheck, setIsUserNewPasswordCheck] = React.useState(false);
	const [isUserNickname, setIsUserNickname] = React.useState(false);
	const [isUserPhoneNumber, setIsUserPhoneNumber] = React.useState(false);

    useEffect(() => {
        setName(member.name);
        setPhone(member.phone);
        setPwd(member.pwd);
    }, [member]);

    // 이름 유효성 검사
    const onChangeNickName = (event: ChangeEvent<HTMLInputElement>) => {
		const newNickName = event.target.value;

		if(newNickName == null || newNickName.trim() === '' || newNickName.length < 2 || newNickName.length > 6) {
			//이름은 2자이상 6자 미만 
			setUserNicknameMessage("이름은 2글자 이상 6글자 이하로 입력해주세요.");
			setIsUserNickname(false);
		} else {
			setUserNicknameMessage("");
			setIsUserNickname(true);
		}
		setName(newNickName);
	};

    // 현재 비밀번호 대조
    const onChangePasswordCheck = (e: { target: { value: any; }; }) => {
        const currentPasswordCheck = e.target.value;
        setPwd(currentPasswordCheck);
    
        if(pwd != currentPasswordCheck) {
            setUserPasswordCheckMessage("비밀번호가 일치 하지 않습니다.");
            setIsUserPasswordCheck(false);
        } else {
            setUserPasswordCheckMessage("");
            setIsUserPasswordCheck(true);
        }
    };

    //  새 비밀번호
	const onChangeNewPasswordCheck = (e: { target: { value: any; }; }) => {
        const currentPasswordCheck = e.target.value;
        setNewPwd(currentPasswordCheck);
    
        if (pwd === currentPasswordCheck) {
            setUserNewPasswordCheckMessage("기존 비밀번호와 일치 합니다.");
            setIsUserNewPasswordCheck(false);
        } else {
            setUserNewPasswordCheckMessage("");
            setIsUserNewPasswordCheck(true);
        }
        const userPasswordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/;
        if (!userPasswordRegExp.test(currentPasswordCheck)) {
            setUserNewPasswordCheckMessage("숫자+영문자+특수문자 조합으로 10자리 이상 입력해주세요.");
            setIsUserNewPasswordCheck(false);
        } else {
            setUserNewPasswordCheckMessage("");
            setIsUserNewPasswordCheck(true);
        }
    };

    // 번호 유효성 검사
    const onChangeUserPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumber = event.target.value;
    
        const userPhoneNumberRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    
        if (!userPhoneNumberRegExp.test(newPhoneNumber)) {
            setUserPhoneNumberMessage("올바른 형식이 아닙니다.");
            setIsUserPhoneNumber(false);
        } else {
            setUserPhoneNumberMessage("");
            setIsUserPhoneNumber(true);
        }
    
        setUserPhoneNumber(newPhoneNumber);
    };

    const updateMember = async () => { 
        const userData = {
            email: auth,
            pwd: member.pwd,
            newPwd: newPwd,
            name: member.name,
            phone: member.phone
        };
        // setIsOpen(false);
        await axios.post("http://localhost:8888/user/updateMember",  userData)
        
        .then((resp) => {
            console.log(resp.data);
    
            if (resp.data === 1) {
            alert("수정이 완료 되었습니다");
            navigate("/user/detail")
            }
    
        }).catch((err) => {
            console.log(err);
        });
    }

	return (
		<>
        <div className="form-valid">
            {/* 이메일 & 비밀번호 입력 */}
                <div className="formBox">
                    <p className="formTit bodyB14x">이메일 주소</p>
                    <div className="mail-input">
                        <input type="email" value={auth} placeholder="이메일을 입력해주세요" readOnly />
                    </div>
                    <span className="info caption">* 이메일주소 변경은 관리자에게 문의해주세요</span>
                </div>
                <div className="formBox">
                    <p className="formTit bodyB14x">비밀번호</p>
                    <div className="pw-input">
                        <input type="password" value={member.pwd} onChange={onChangePasswordCheck} name="password" placeholder="기존비밀번호를 입력해주세요" required />
                        <input type="password" value={newPwd} onChange={onChangeNewPasswordCheck} name="password" placeholder="새 비밀번호를 입력해주세요" required />
                    </div>
                    <p className="message body14x">{userPasswordCheckMessage}</p>
                    <p className="message mixMassage body14x">{userNewPasswordCheckMessage}</p>
                </div>
            
            {/* 이름 & 연락처 입력 */}
            <div>
                <p className="formTit bodyB14x">이름</p>
                <div className="txt-input">
                    <input type="text" value={name} onChange={onChangeNickName} placeholder="이름을 입력해주세요" required />
                </div>
                <p className="message body14x">{userNicknameMessage}</p>
            </div>	
            <div>
                <p className="formTit bodyB14x">연락처</p>
                <div className="txt-input">
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="휴대폰번호를 입력해주세요" required />
                </div>
                <p className="message body14x">{userPhoneNumberMessage}</p>									
            </div>                
        </div>
        <Button size="Medium" onClick={updateMember}>변경 완료</Button>
        </>
    );
} 