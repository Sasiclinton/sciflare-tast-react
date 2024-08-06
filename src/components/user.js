import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'
import { useLocation } from "react-router-dom";

const WelcomeUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const userData = location.state || {}//'66ae3ef534d652a87e983280';

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                debugger;
                const response = await axios.get(`http://localhost:5000/api/user/${userData.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                setUser(response.data);
            } catch (err) {
                setError('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>No user data available</p>;

    return (
        <div className="welcome-user">
            <h1>Welcome, {user.name}!</h1>
            <p>Email: <span className="info">{user.email}</span></p>
            <p>Role: <span className="info">{user.role}</span></p>
            <p>Organization: <span className="info">{user?.organization?.address || 'NA'}</span></p>
        </div>
    );
};

export default WelcomeUser;
