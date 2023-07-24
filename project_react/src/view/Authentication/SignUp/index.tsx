import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, CardHeader, Typography } from '@mui/material';
import { signUpApi } from '../../../apis';

interface Props {
  setAuthView: (authView: boolean) => void,
}

export default function SignUp(props: Props) {
  // const [requestResult, setRequestResult] = useState<string>('');
  const [userEmail, setUserEmail] = useState<String>('');
  const [userPassword, setUserPassword] = useState<String>('');
  const [userPasswordCheck, setUserPasswordCheck] = useState<String>('');
  const [userNickname, setUserNickname] = useState<String>('');
  const [userPhoneNumber, setUserPhoneNumber] = useState<String>('');

  const {setAuthView} = props

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
    setAuthView(false);
  }
  
  return (
    <Card sx={{minWidth: 275, maxWidth: "50vw"}}>
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
    </Card>
  )
}
