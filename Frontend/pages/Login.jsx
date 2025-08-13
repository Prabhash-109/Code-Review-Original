import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { handleSucces, handleError } from '../src/utils';

const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  
  const [loginInfo,setLoginInfo]=useState({
    email: '',
    password: ''
  })
  const handleOnChange=(e)=>{
    const {name,value} = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
    console.log(copyLoginInfo);

  }
  const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = loginInfo;

  if (!email || !password) {
    return handleError('Email and password are required');
  }
  if (password.length < 6) {
    return handleError('Password must be at least 6 characters long');

  }

  try {
    const url = "http://localhost:3000/auth/login";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });

    const result = await response.json();
    const { message, success,name,jwtToken,error } = result;
   if (success) {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('loggedInUser', name);

   window.dispatchEvent(new Event('storage'));
    setIsLoggedIn(true);
    handleSucces(message);
    setTimeout(() => {
    navigate('/');
  }, 1500);
   
  }
   else if(!success){
      handleError(message);
    }
    console.log(result);



  } catch (err) {
    handleError('Login Error ');
    }
};


  return (
    <div className="signup-wrapper">
      <div className='signup-container'>
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
          <div>            
            <label htmlFor='email'>Email</label>
            <input
              onChange={handleOnChange}
              type='email'
              name='email'
              required
              placeholder='Enter your email...'
              value={loginInfo.email}

            />
            <label htmlFor='password'>Password</label>
            <input
              onChange={handleOnChange}
              type='password'
              name='password'
              required
              placeholder='Enter your password...'
              value={loginInfo.password}

            />
          </div>
          <button type='submit'>Login</button>
          <span>Don't have an account? <Link to="/signup">Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
