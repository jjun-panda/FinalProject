import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout';
import Box from '@mui/material/Box';
import SignUp from './SignUp';
import LogIn from './LogIn';

export default function Authentication() {
  // 로그인 false, 회원가입 true
  const [authView, setAuthView] = useState<boolean>(true);

  return (
    <>
      <Box display='flex' height='100vh'>
        <Box flex={1} display='flex' justifyContent='center' alignItems='center'>

        </Box>
        <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
          { authView ? (<SignUp setAuthView={setAuthView} />) : (<LogIn setAuthView={setAuthView} />) }          
        </Box>
      </Box>
    </>
  )
}
