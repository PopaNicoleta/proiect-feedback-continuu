import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    isLogged: false,
    userId: -1
  });

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    console.log(info);
    if(info) {
      setUserInfo(info);
      if(info.isLogged) {
        //const usgetUserById(id) in backend
        //if(user.type === "professor") redirect
      } 
      else {
        navigate("/login");
      }
    }
    else {
      navigate("/login");
    }
  }, []);

  return (
    <><h1>Hello!</h1></>
  )
}

export default App
