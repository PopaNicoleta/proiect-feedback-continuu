import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    isLogged: false,
    userId: -1
  });

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if(info) {
      setUserInfo(info);
      if(!info.isLogged) {
        navigate("/login");
      }
    }
    else {
      navigate("/login");
    }
  }, []);

  return (
    <><h1>You should not be here!</h1></>
  )
}

export default App
