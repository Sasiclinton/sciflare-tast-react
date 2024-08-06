import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Auth from './components/auth';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Error from './components/error';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Sidebar from './utils/side-bar';
import Organisation from './components/organisation';
import WelcomeUser from './components/user';

function App() {
  let data = [{
    name: 'sasi',
    age: 10,
    phone: 8248128995
  },
  {
    name: 'clinton',
    age: 11,
    phone: 8248128995
  },
  {
    name: 'guess',
    age: 12,
    phone: 8248128995
  }]
  const [users, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(data1 => data1.json())
  //     .then(json => setUser(json))
  //     .finally(() => { setLoading(false) })
  // }, [])
const checkLogin = localStorage.setItem('logedIn', true);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>

    //   <div className="App">
    //     {loading ? (<div>Loading.....</div>) : (
    //       <table border={1}>
    //         <tr>
    //           <th>Id</th>
    //           <th>Name</th>
    //           <th>User</th>
    //           <th>Phone</th>
    //         </tr>
    //         {users.map(item => (
    //           <tr>
    //             <td>{item.id}</td>
    //             <td>{item.name}</td>
    //             <td>{item.username}</td>
    //             <td>{item.phone}</td>
    //           </tr>
    //         ))}

    //       </table>
    //     )}

    //   </div>
    // </div>

        <BrowserRouter>
      <Routes>
         {/* <Route path="/" element={checkLogin ? <Auth /> : <Login />} /> */}
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/user" element={<WelcomeUser />} />
        <Route path="/organisation" element={<Organisation />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
