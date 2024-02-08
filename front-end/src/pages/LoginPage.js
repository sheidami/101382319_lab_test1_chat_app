import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const logIn = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/login', {
                username,
                password,
            });

            if (response.data.status) {
                localStorage.setItem("valid", true);
                navigate('/roomList');
            } else {
                setError('Incorrect email or password');
              }
        } catch (e) {
              setError(e.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="login-container">
            <h1>Log In</h1>
            <input
                className='input-field'
                placeholder='Your email address'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className='input-field'
                type='password'
                placeholder='Your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='login-button' onClick={logIn}>
                Log In
            </button>
            <Link to='/signup' className='signup-link'>
                Don't have an account? Create one here
            </Link>
        </div>
    );
};

export default LoginPage;