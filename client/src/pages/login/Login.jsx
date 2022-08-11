import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.scss";
import {login} from "../../context/authContext/authApi.js"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate()
  const {state,dispatch} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
  login({email,password},dispatch)
  if(state.user) {
    navigate("/")
  }
  }

  return (
    <div className="login">
      <div className="top">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button onClick={handleLogin}>Sign In</button>
          <span>
            New to Netflix ? <Link to = "/register"><b>Sign up now.</b></Link> 
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
