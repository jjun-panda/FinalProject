import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import MainLayout from './view/layouts/MainLayout';

function App() {

  // SpringBoot 연결
  const [connection, setConnection] = useState<string>('');
  
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
    <div className="App">
      <MainLayout />
    </div>
    <img src='http://jjuns-c.com/components/jjun_logo_f.svg' className="App-logo" alt="logo" width={300} />
    <p style={
      {position: 'fixed',
      bottom: '0',
      left: '1rem',
      backgroundColor: 'aquamarine'}}>Spring Boot 연결상태: <strong>{connection}</strong></p> 
    </>
  );
}

export default App;
