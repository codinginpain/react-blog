import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

import "./LoginPage.css";

function LoginPage() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");   

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }


  const onSubmitHandler = (event) => {
    event.preventDefault(); //이걸 작성하지않으면 page가 무조건 refresh가 일어남

    // console.log('Email', Email);
    // console.log('Password', Password);

    let body = {
      email: Email,
      password: Password,
    }

    dispatch(loginUser(body))

  }
  
  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
        </button>


      </form>
    </div>
  );
}

export default LoginPage;