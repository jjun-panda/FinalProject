import { useEffect, useState } from 'react';
import axios from 'axios';
import './assets/css/common.css';
import RouterLayOut from './router/Router';
import React from 'react';

function App() {
  // SpringBoot 연결 상태를 저장하는 상태 변수
  const [connection, setConnection] = useState<string>('');

  // 다크 모드 설정 상태 변수
  const [darkMode, setDarkMode] = useState(false);

  // 다크 모드 토글 함수
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    setDarkMode(!darkMode);
    localStorage.setItem('userDarkModePreference', newTheme); // 사용자 모드 설정 저장
    let degree = 0;
    const intervalId = setInterval(() => {
      degree += 3;
      if (degree >= 360) {
        clearInterval(intervalId);
      }
      const sampleElement = document.querySelector('#themeMode') as HTMLElement;
      if (sampleElement) {
        sampleElement.style.transform = `scale(1) rotate(${degree}deg)`;
      }
    }, 1);
  };

  // SpringBoot 연결 테스트 함수
  const connectionTest = () => {
    axios.get('http://localhost:8888/').then((response) => {
      // axios.get('http://192.168.10.93:8888/').then((response) => {
        setConnection(response.data);
    }).catch((error) => {
      setConnection(error.message);
    })
  }

  useEffect(() => {
    connectionTest();
  }, []);

  useEffect(() => {
    const userModePreference = localStorage.getItem('userDarkModePreference');
    if (userModePreference === 'dark' || userModePreference === 'light') {
      const htmlElement = document.documentElement;
      htmlElement.setAttribute('data-theme', userModePreference);
      setDarkMode(userModePreference === 'dark');
    }
  }, []);

  const buttonLabel = darkMode ? '🌜' : '🌞';

  return (
    <>
      <RouterLayOut />
      <p
        style={{
          position: 'fixed',
          color: '#000',
          bottom: '0',
          left: '1rem',
          backgroundColor: 'aquamarine',
        }}
      >
        Spring Boot 연결상태: <strong>{connection}</strong>
      </p>
      <button id="themeMode" className="themeMode title32x" onClick={toggleDarkMode}>
        {buttonLabel}
      </button>
    </>
  );
}

export default App;
