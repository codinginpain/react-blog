import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { withRouter} from 'react-router-dom';

import "./LoginPage.css";

function LoginPage(props) {
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

    //redux를 안쓰면 여기서 바로 axios해서 보내면 되는데 redux를 위해 여기서 dispatch를 활용
    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
          props.history.push('/'); //react에서 page를 이동시킬때는 props.history를 이용함
        }else {
          alert('error');
        }
      })

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

export default withRouter(LoginPage);