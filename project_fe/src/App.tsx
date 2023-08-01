import { useEffect, useState } from 'react';
import axios from 'axios'
import "./assets/css/common.css"
import RouterLayOut from './router/Router';
import React from 'react';

function App() {

  // SpringBoot 연결
  const [connection, setConnection] = useState<string>('');
  // const URL = process.env.PROJECT_API_URL;

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
  
  return (
    <>
    <RouterLayOut />
    <p style={
      {position: 'fixed',
      bottom: '0',
      left: '1rem',
      backgroundColor: 'aquamarine'}}>Spring Boot 연결상태: <strong>{connection}</strong></p> 
    </>
  );
}

export default App;
