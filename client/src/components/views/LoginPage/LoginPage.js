import React, { useState } from 'react';

import "./LoginPage.css";

function LoginPage() {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  return (
    <div className="loginContainer">
      <form className="loginForm">
        <label>Email</label>
        <input type="email" Email onChange />
        <label>Password</label>
        <input type="password" Password onChange />
        <br />
        <button>
          Login
        </button>


      </form>
    </div>
  );
}

export default LoginPage;