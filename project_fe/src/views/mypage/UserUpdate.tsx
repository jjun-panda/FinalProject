import React, { useEffect, useState, useContext, ChangeEvent  } from "react";
import "../css/contents_mypage.css"
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/images/user.svg"
import "../css/user_page.css"
import Button from "../../components/Button";
import UserMenu from "./UserMenu";

interface MyPage {
	name : string;
    phone : string;
    email : string;
    // pwd : string;
}

export default function UserUpdate() {
    const [memberInfo, setMemberInfo] = useState<MyPage>({} as MyPage);
    const { auth, setAuth } = useContext(AuthContext);

    // Paging
	const [page, setPage] = useState(1);

    // Link 용 (함수) 
	let navigate = useNavigate();
    
	const location = useLocation();

	useEffect(() => {
		if (location.state?.gotoTop) {
			window.scrollTo(0, 0);
		}
	}, [location]);

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
                <UserMenu />

                {/* 우측 */}
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

	const [pwd, setPwd] = useState('');
    const [name, setName] = useState(member.name);
    const [phone, setPhone] = useState(member.phone);

	const [userPasswordMessage, setUserPasswordMessage] = useState<String>('');
	const [userNicknameMessage, setUserNicknameMessage] = useState<String>('');
	const [userPhoneNumberMessage, setUserPhoneNumberMessage] = useState<String>('');

	const [isUserPassword, setIsUserPassword] = React.useState(false);
	const [isUserNickname, setIsUserNickname] = React.useState(false);
	const [isUserPhoneNumber, setIsUserPhoneNumber] = React.useState(false);

    useEffect(() => {
        setName(member.name);
        setPhone(member.phone);
    }, [member]);
    
    // 이름 유효성 검사
    const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
		const newNickName = e.target.value;
        setName(newNickName);

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

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		const currentPassword = event.target.value;
		setPwd(currentPassword);
		const userPasswordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/;
		// 10,25 최소 10자리 최대 25자리
		if (!userPasswordRegExp.test(currentPassword)) {
			setUserPasswordMessage("숫자+영문자+특수문자 조합으로 10자리 이상 입력해주세요.");
			setIsUserPassword(false);
		} else {
			setUserPasswordMessage("");
			setIsUserPassword(true);
		}
	};

    // 번호 유효성 검사
    const onChangeUserPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    let currentUserPhoneNumber = event.target.value;

		// userPhoneNumberRegExp => phoneFormatWithDashRegExp 
    const phoneFormatWithDashRegExp = /^010-?([0-9]{4})-?([0-9]{4})$/;
		// phoneFormatNoDashRegExp
    const phoneFormatNoDashRegExp = /^010([0-9]{8})$/;
	
    
		setPhone(currentUserPhoneNumber);

		// 010-1111-1111 // 0101111111
		if (phoneFormatWithDashRegExp.test(currentUserPhoneNumber) || phoneFormatNoDashRegExp.test(currentUserPhoneNumber)) {
			setUserPhoneNumberMessage("");
			setIsUserPhoneNumber(true);
			return;
		}

    if (!phoneFormatWithDashRegExp.test(currentUserPhoneNumber)) {
        setUserPhoneNumberMessage("올바른 형식이 아닙니다. ");
				setIsUserPhoneNumber(false);
    }
	if (!phoneFormatNoDashRegExp.test(currentUserPhoneNumber)) {
		setUserPhoneNumberMessage("올바른 형식이 아닙니다.");
		setIsUserPhoneNumber(false);
	}
	};

    const updateMember = async () => { 
        const userData = {
            email: auth,
            pwd: pwd,
            name: name,
            phone: phone
        };
        // setIsOpen(false);
        await axios.post("http://localhost:8888/user/updateMember",  userData)
        
        .then((resp) => {
            console.log(resp.data);
    
            if (resp.data === 1) {
            alert("수정이 완료 되었습니다");
            navigate(0)
            }
    
        }).catch((err) => {
            console.log(err);
        });

		localStorage.removeItem("board_access_token");
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
                <p className="formTit bodyB14x">새 비밀번호</p>
                <div className="pw-input">
                    <input type="password" value={pwd} onChange={onChangePassword} name="password" placeholder="변경하실 비밀번호를 입력해주세요" required />
                </div>
                <p className="message body14x">{userPasswordMessage}</p>
            </div>
            
            {/* 이름 & 연락처 입력 */}
            <div className="formBox">
                <p className="formTit bodyB14x">이름</p>
                <div className="txt-input">
                    <input type="text" value={name} onChange={onChangeNickName} placeholder="이름을 입력해주세요" required />
                </div>
                <p className="message body14x">{userNicknameMessage}</p>
            </div>	
            <div className="formBox">
                <p className="formTit bodyB14x">연락처</p>
                <div className="txt-input">
                    <input type="text" value={phone} onChange={onChangeUserPhoneNumber} placeholder="휴대폰번호를 입력해주세요" required />
                </div>
                <p className="message body14x">{userPhoneNumberMessage}</p>									
            </div>                
        </div>
        <Button size="Medium" onClick={updateMember}>변경 완료</Button>
        </>
    );
} 