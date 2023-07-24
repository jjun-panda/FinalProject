import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import { useUserStore } from '../../../stores';
import { useCookies } from 'react-cookie';

export default function Navigation() {
  const [cookies, setCookies] = useCookies();
  const { user, removeUser } = useUserStore();

  const logOutHandler = () => {
    setCookies('token', '', {expires: new Date()})
    removeUser();
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            page
          </Typography>
          {!user ? (
              <Button color="inherit">회원가입</Button>
            ) : (
              <Button color="inherit" onClick={() => logOutHandler()}>로그아웃</Button>
            ) }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
