// src/components/Sidebar.js
import React from 'react';
import './sidebar.css'; // Import the CSS for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Org-Management</h2>
      <ul>
        <li><a href="/dashboard">User</a></li>
        <li><a href="/organisation">Organisation</a></li>
        {/* <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
