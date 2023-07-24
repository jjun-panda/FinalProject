import { useEffect, useState } from 'react';
import axios from 'axios'
import MainLayout from './view/layouts/MainLayout';
import "./assets/css/common.css"

function App() {

  // SpringBoot 연결
  const [connection, setConnection] = useState<string>('');
  
  const connectionTest = () => {
    // axios.get('http://localhost:8888/').then((response) => {
    axios.get('http://192.168.10.93:8888/').then((response) => {
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
    <p style={
      {position: 'fixed',
      bottom: '0',
      left: '1rem',
      backgroundColor: 'aquamarine'}}>Spring Boot 연결상태: <strong>{connection}</strong></p> 
    </>
  );
}

export default App;
