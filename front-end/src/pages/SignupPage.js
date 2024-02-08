import {useState} from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css'; 
import axios from 'axios';

const SignupPage = () => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError(''); 

        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/signup', {
                username, 
                email, 
                firstname,
                lastname,
                password
            });

            console.log('Registration successful', response.data);
       
        } catch (error) {
            
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(error.response.data.message || 'An error occurred during registration');
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        
        }
    };
    return(
        <div className="signup-container">
        <h1>Create Account</h1>
        <input
        className='input-field'
        placeholder='Enter Your Username'
        value={username}
        onChange={e => setUsername(e.target.value)}/>
        <input
        className='input-field'
        placeholder='Your email address'
        value={email}
        onChange={e => setEmail(e.target.value)}/>
        <input
        className='input-field'
        placeholder='Your first name'
        value={firstname}
        onChange={e => setFirstname(e.target.value)}/>
        <input
        className='input-field'
        placeholder='Your last name'
        value={lastname}
        onChange={e => setLastname(e.target.value)}/>
        <input 
        className='input-field'
        type="password"
        placeholder='Your password'
        value={password}
        onChange={e => setPassword(e.target.value)}/>
        <input 
        className='input-field' 
        type="password"
        placeholder='Re-enter your password'
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}/>
        <button className='signup-button'onClick={handleSubmit}>Create Account</button>
        <Link to="/" className='login-link'>Already have an account? Log in here</Link>
        </div>
    )

    
}

export default SignupPage;