import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Values } from '../Chatroom';
// import './Login.scss';

function Login() {
  const { username, setUsername } = useContext(Values);

  const handleUsername = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  }

  return (
    <div className='login'>
      <div className='login-area'>
        <label className='login-title'>
          {"Username: "}
          <input value={username} onChange={handleUsername} className='login-input'></input>
        </label>
        <Link to="/Chatroom" id="Chatroom" className="login-btn" style={{pointerEvents: (username === "" ? "none" : "auto")}}>{"Login"}</Link>
      </div>
    </div>
  )
}

export default Login
