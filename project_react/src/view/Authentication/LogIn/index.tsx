import React, { useState } from 'react';
import { Card, CardContent, CardActions, TextField, Button, CardHeader, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../../stores';
import { logInApi } from '../../../apis';

interface Props {
  setAuthView: (authView: boolean) => void,
}

export default function LogIn(props: Props) {
  const [userEmail, setUserEmail] = useState<String>('');
  const [userPassword, setUserPassword] = useState<String>('');
  const [cookies, setCookies] = useCookies();
  const { user, setUser } = useUserStore();

  const {setAuthView} = props

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
    <Card sx={{minWidth: 275, maxWidth: "50vw"}}>
      { user != null && (<>{user.userNickname}</>)}
      <CardHeader title={'로그인'}></CardHeader>
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
    </Card>
  )
}
