import React, { useState } from 'react';
import axios from 'axios';
import Home from './home';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            const user = { role: res.data.role, userId: res.data._id };  // Assuming API returns this data
            console.log(user.email);
            localStorage.setItem('logedIn', true);
            debugger;
            res.data.role === 'admin' ? navigate('/dashboard', { state: user }) : navigate('/user', { state: res.data })
            alert('Login successful');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin} style={{ textAlign: 'center', padding: '20px' }}>
            <h3>User & Admin Login</h3>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Login;
