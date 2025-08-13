import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { handleSucces, handleError } from '../src/utils';
const API_URL = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const navigate = useNavigate();
  
  const [signupInfo,setsignupInfo]=useState({
    name: '',
    email: '',
    password: ''
  })
  const handleOnChange=(e)=>{
    const {name,value} = e.target;
    console.log(name, value);
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
    console.log(copysignupInfo);

  }
  const handleOnSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password } = signupInfo;

  if (!name || !email || !password) {
    return handleError('Name, email, and password are required');
  }
  if (password.length < 6) {
    return handleError('Password must be at least 6 characters long');

  }

  try {
    const url = `${API_URL}/auth/signup`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupInfo),
    });

    const result = await response.json();
    const { message, success } = result;
    if(success){
      handleSucces(message);
      setTimeout(() => {
       navigate('/login');
      }, 2000);
    }
    else if(response.status === 409){
      handleError('User already exists, you can login');
    }else if(!success){
      handleError(message);
    }
    console.log(result);



  } catch (err) {
    handleError('Signup Error ');  }
};


  return (
    <div className="signup-wrapper">
      <div className='signup-container'>
        <h1>Signup Page</h1>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              onChange={handleOnChange}
              type='text'
              name='name'
              autoFocus
              placeholder='Enter your name...'
              value={signupInfo.name}
            />
            <label htmlFor='email'>Email</label>
            <input
              onChange={handleOnChange}
              type='email'
              name='email'
              placeholder='Enter your email...'
              value={signupInfo.email}

            />
            <label htmlFor='password'>Password</label>
            <input
              onChange={handleOnChange}
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={signupInfo.password}

            />
          </div>
          <button type='submit'>Sign Up</button>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
