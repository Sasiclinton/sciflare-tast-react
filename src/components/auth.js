import React, { useState } from 'react';
import Login from './login';
import Signup from './/signup';

const Auth = () => {
  const [view, setView] = useState('login');

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Welcome to the Org-Management App</h2>
      <div>
        {/* <button onClick={() => setView('login')}>Login</button> */}
        {/* <button onClick={() => setView('signup')}>Signup</button> */}
      </div>
      <div>
        {view === 'login' ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Auth;
