import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            localStorage.setItem('token', response.data.token); // Save token in local storage
            // Redirect or do something after successful login
            window.location.href = '/add-news';
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                </div>
            </div>
        </div>
        </>
    );
};

export default LoginForm;

