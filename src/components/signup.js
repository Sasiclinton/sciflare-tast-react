import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token);
      const user = { email: res.data.email };  // Assuming API returns this data
      console.log(user.email);
      localStorage.setItem('logedIn', true);
      navigate('/dashboard', { state: user });
      alert('Signup successful');
    } catch (err) {
      setError('Error signing up');
    }
  };

  return (
    <form onSubmit={handleSignup} style={{ textAlign: 'center', padding: '20px' }}>
      <h3>Signup</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br />
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
      <button type="submit">Signup</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Signup;
