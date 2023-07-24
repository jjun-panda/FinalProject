import React, { useState } from 'react'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import { Button, CardHeader, Typography } from '@mui/material';
import { signUpApi } from '../../../apis';
import './css/signup.css';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';

// interface Props {
//   setAuthView: (authView: boolean) => void,
// }
export default function SignUp() {
// export default function SignUp(props: Props) {
  // const [requestResult, setRequestResult] = useState<string>('');
  const [userEmail, setUserEmail] = useState<String>('');
  const [userPassword, setUserPassword] = useState<String>('');
  const [userPasswordCheck, setUserPasswordCheck] = useState<String>('');
  const [userNickname, setUserNickname] = useState<String>('');
  const [userPhoneNumber, setUserPhoneNumber] = useState<String>('');

  // const {setAuthView} = props

  const signUpHandler = async () => {
    const data = {
      userEmail,
      userPassword,
      userPasswordCheck,
      userNickname,
      userPhoneNumber,
    };
    
    const signInResponse = await signUpApi(data);

    if (!signInResponse) {
      alert("회원가입에 실패했습니다."); 
      return;
    }
    if (!signInResponse.result) {
      alert("회원가입에 실패했습니다."); 
      return;
    }
    alert("회원이 되신 것을 축하드립니다."); 
    // setAuthView(false);
  }
  
  return (
    <>
      <div id="signupRequired">
        <div className="">
          <form id="signupRequiredForm" data-signup-form="signupForm" className="signupForm">
            
            {/* 타이틀 */}
            <div className="titleWrap">
              <Link to="/">
                <div className="mobile-logo">
                  <img src="https://jjundesign.gabia.io/components/jjun_logo_f.svg" alt="logo"  width={150}/>
                </div>
              </Link>
              <div className="bodyB32x">
                처음 오셨나요?
              </div>
              <div className="body16x">
                회원가입 시 모든 서비스를 이용하실 수 있어요!
              </div>
            </div>

            {/* 이메일 & 비밀번호 입력 */}
            <div className="form-valid">
              <div className="mail-input">
                {/* <svg width="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" class="inline-blcok absolute top-[50%] left-[16px] translate-y-[-50%]"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20a7.959 7.959 0 0 0 4.649-1.489C15.6 17.645 13.983 17 12 17s-3.601.645-4.649 1.511A7.959 7.959 0 0 0 11.974 20H12Zm0-5c2.46 0 4.66.833 6.128 2.143a8 8 0 1 0-12.256 0C7.339 15.833 9.54 15 12 15Zm10-3a9.97 9.97 0 0 1-2.929 7.071A9.97 9.97 0 0 1 12 22a9.974 9.974 0 0 1-7.403-3.278A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10Zm-8-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="current"></path></svg> */}
                <input type="email" onChange={(e) => setUserEmail(e.target.value)} placeholder="이메일을 입력해주세요" required />
              </div>
              <div className="pw-input">
                {/* <svg width="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" class="inline-blcok absolute top-[50%] left-[16px] translate-y-[-50%]"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20a7.959 7.959 0 0 0 4.649-1.489C15.6 17.645 13.983 17 12 17s-3.601.645-4.649 1.511A7.959 7.959 0 0 0 11.974 20H12Zm0-5c2.46 0 4.66.833 6.128 2.143a8 8 0 1 0-12.256 0C7.339 15.833 9.54 15 12 15Zm10-3a9.97 9.97 0 0 1-2.929 7.071A9.97 9.97 0 0 1 12 22a9.974 9.974 0 0 1-7.403-3.278A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10Zm-8-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="current"></path></svg> */}
                <input type="password" onChange={(e) => setUserPassword(e.target.value)} name="password" placeholder="비밀번호를 입력해주세요" required />
              </div>
              <div className="pw-input">
                {/* <svg width="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" class="inline-blcok absolute top-[50%] left-[16px] translate-y-[-50%]"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20a7.959 7.959 0 0 0 4.649-1.489C15.6 17.645 13.983 17 12 17s-3.601.645-4.649 1.511A7.959 7.959 0 0 0 11.974 20H12Zm0-5c2.46 0 4.66.833 6.128 2.143a8 8 0 1 0-12.256 0C7.339 15.833 9.54 15 12 15Zm10-3a9.97 9.97 0 0 1-2.929 7.071A9.97 9.97 0 0 1 12 22a9.974 9.974 0 0 1-7.403-3.278A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10Zm-8-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="current"></path></svg> */}
                <input type="password" onChange={(e) => setUserPasswordCheck(e.target.value)} name="password" placeholder="비밀번호 한번 더 입력해주세요" required />
              </div>
            </div>
            {/* 이름 & 연락처 입력 */}
            <div className="form-valid">
              <div className="mail-input">
                {/* <svg width="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" class="inline-blcok absolute top-[50%] left-[16px] translate-y-[-50%]"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20a7.959 7.959 0 0 0 4.649-1.489C15.6 17.645 13.983 17 12 17s-3.601.645-4.649 1.511A7.959 7.959 0 0 0 11.974 20H12Zm0-5c2.46 0 4.66.833 6.128 2.143a8 8 0 1 0-12.256 0C7.339 15.833 9.54 15 12 15Zm10-3a9.97 9.97 0 0 1-2.929 7.071A9.97 9.97 0 0 1 12 22a9.974 9.974 0 0 1-7.403-3.278A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10Zm-8-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="current"></path></svg> */}
                <input type="text" onChange={(e) => setUserNickname(e.target.value)} placeholder="이름을 입력해주세요" required />
              </div>
              <div className="pw-input">
                {/* <svg width="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" class="inline-blcok absolute top-[50%] left-[16px] translate-y-[-50%]"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20a7.959 7.959 0 0 0 4.649-1.489C15.6 17.645 13.983 17 12 17s-3.601.645-4.649 1.511A7.959 7.959 0 0 0 11.974 20H12Zm0-5c2.46 0 4.66.833 6.128 2.143a8 8 0 1 0-12.256 0C7.339 15.833 9.54 15 12 15Zm10-3a9.97 9.97 0 0 1-2.929 7.071A9.97 9.97 0 0 1 12 22a9.974 9.974 0 0 1-7.403-3.278A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10Zm-8-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="current"></path></svg> */}
                <input type="text" onChange={(e) => setUserPhoneNumber(e.target.value)} name="password" placeholder="휴대폰번호를 입력해주세요" required />
              </div>
            </div>
            <div className="signup-submitBtn">
              <Button size="Medium" onClick={() => signUpHandler()}>회원가입</Button>
            </div>
            
            {/* 비밀번호 및 회원가입 링크  */}
            <div className="signupLinkWrap">
              <div className="logIn">
                <span className='body14x'>이미 회원이신가요?</span>
                {/* <a role="button" className="bodyB14x" onClick={() => setAuthView(false)} title="로그인 하기">로그인 하기</a> */}
                <Link role="button" className="bodyB14x" title="로그인 하기" to='/login'>로그인 하기</Link>
              </div>
            </div>

          </form>
        </div>
      </div>

    {/* <Card sx={{minWidth: 275, maxWidth: "50vw"}}>
      <CardHeader title={'회원가입'}></CardHeader>
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
          <TextField
            fullWidth
            label="비밀번호 확인" 
            type='password' 
            variant="standard" 
            onChange={(e) => setUserPasswordCheck(e.target.value)} 
          />
          <TextField
            fullWidth
            label="닉네임" 
            variant="standard" 
            onChange={(e) => setUserNickname(e.target.value)} 
          />
          <TextField
            fullWidth
            label="휴대폰 번호" 
            variant="standard" 
            onChange={(e) => setUserPhoneNumber(e.target.value)} 
          />
        </Box>
      </CardContent>
      <CardActions>
        <Box component='div'>
          <Button fullWidth variant="contained" onClick={() => signUpHandler()}>회원가입</Button>
        </Box>
        <Box component='div' display="flex" mt={2}>
          <Typography>이미 계정이 있으신가요?</Typography>
          <Typography ml={1} onClick={() => setAuthView(false)}>로그인</Typography>
        </Box>
      </CardActions>
    </Card> */}
    </>
  )
}
