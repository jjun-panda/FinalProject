import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../../stores';
import { logInApi } from '../../../apis';
import Terms from './terms';
import EmailLogin from './emailLogin';
import SNSLogin from './snsAPI';
import './css/login.css';
import './css/modal.css';
import FindPassword from './findPassword';
import { Link } from 'react-router-dom';

// interface Props {
//   setAuthView: (authView: boolean) => void,
// }

export default function LogIn() {
// export default function LogIn(props: Props) {

  const [userEmail, setUserEmail] = useState<String>('');
  const [userPassword, setUserPassword] = useState<String>('');
  const [cookies, setCookies] = useCookies();
  const { user, setUser } = useUserStore();

  // const {setAuthView} = props

  const LogInHandler = async () => {
    if (userEmail.length === 0 || userPassword.length === 0) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }
    const data = {
      userEmail,
      userPassword,
    };

    const signInResponse = await logInApi(data);

    if (!signInResponse) {
      alert("이메일 또는 비밀번호를 다시 확인해주세요"); 
      return;
    }
    if (!signInResponse.result) {
      alert("이메일 또는 비밀번호를 다시 확인해주세요"); 
      return;
    }
    // alert("로그인 성공했습니다."); 
    // setAuthView(false);

    const { token, exprTime, user } = signInResponse.data;
    const expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + exprTime);

    setCookies("token", token, { expires });
    setUser(user);
  }

  return (
    <>
      <div id="loginRequired">
        <div className="">
          <form id="loginRequiredForm" data-login-form="loginForm" className="loginForm">
            
            {/* 타이틀 */}
            <div className="titleWrap">
              <Link to="/"> 
                <div className="mobile-logo">
                  <img src="https://jjundesign.gabia.io/components/jjun_logo_f.svg" alt="logo"  width={150}/>
                </div>
              </Link>
              <div className="bodyB32x">
                만나서 반가워요!
              </div>
              <div className="body16x">
                서비스 이용을 위해 로그인이 필요해요.
              </div>
            </div>

            {/* 이메일 로그인 */}
            <div className="form-valid">
              <div className="mail-input">
                {/* <svg width="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" class="inline-blcok absolute top-[50%] left-[16px] translate-y-[-50%]"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20a7.959 7.959 0 0 0 4.649-1.489C15.6 17.645 13.983 17 12 17s-3.601.645-4.649 1.511A7.959 7.959 0 0 0 11.974 20H12Zm0-5c2.46 0 4.66.833 6.128 2.143a8 8 0 1 0-12.256 0C7.339 15.833 9.54 15 12 15Zm10-3a9.97 9.97 0 0 1-2.929 7.071A9.97 9.97 0 0 1 12 22a9.974 9.974 0 0 1-7.403-3.278A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10Zm-8-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="current"></path></svg> */}
                <input type="email" onChange={(e) => setUserEmail(e.target.value)} placeholder="이메일을 입력해주세요" required />
              </div>
              <div className="pw-input">
                {/* <svg width="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" class="inline-blcok absolute top-[50%] left-[16px] translate-y-[-50%]"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20a7.959 7.959 0 0 0 4.649-1.489C15.6 17.645 13.983 17 12 17s-3.601.645-4.649 1.511A7.959 7.959 0 0 0 11.974 20H12Zm0-5c2.46 0 4.66.833 6.128 2.143a8 8 0 1 0-12.256 0C7.339 15.833 9.54 15 12 15Zm10-3a9.97 9.97 0 0 1-2.929 7.071A9.97 9.97 0 0 1 12 22a9.974 9.974 0 0 1-7.403-3.278A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10Zm-8-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="current"></path></svg> */}
                <input type="password" onChange={(e) => setUserPassword(e.target.value)} name="password" placeholder="비밀번호를 입력해주세요" required />
              </div>
            </div>
            <EmailLogin />
            
            {/* 비밀번호 및 회원가입 링크  */}
            <div className="loginLinkWrap">
              <div className="findPw">
                <FindPassword />
              </div>
              <div className="signUp">
                <span className='body14x'>회원이 아니신가요?</span>
                <Link role="button" className="bodyB14x" title="회원가입 하기" to='/signup'>회원가입 하기</Link>
                {/* <a role="button" className="bodyB14x" onClick={() => setAuthView(true)} title="회원가입 하기">회원가입 하기</a> */}
              </div>
            </div>

            {/* SNS 로그인 */}
            <SNSLogin />

            {/* 개인정보 동의 문구 */}
            <Terms />
          </form>
        </div>
      </div>

    {/* <Card sx={{minWidth: 275, maxWidth: "50vw"}}>
      { user != null && (<>{user.userNickname}</>)}
      <CardContent>
        <Box height={'50vh'}>
          <TextField
            fullWidth
            label="이메일 주소" 
            type="email" 
            variant="standard" 
            onChange={(e) => setUserEmail(e.target.value)} 
          />
          <TextField
            fullWidth
            label="비밀번호" 
            type="password" 
            variant="standard" 
            onChange={(e) => setUserPassword(e.target.value)} 
          />
        </Box>
      </CardContent>
      <CardActions>
        <Box component='div'>
          <Button fullWidth variant="contained" onClick={() => LogInHandler()}>로그인</Button>
        </Box>
        <Box component='div' display="flex" mt={2}>
          <Typography>신규 사용자 이신가요?</Typography>
          <Typography ml={1} onClick={() => setAuthView(true)}>회원가입</Typography>
        </Box>
      </CardActions>
    </Card> */}
    </>
  )
}
