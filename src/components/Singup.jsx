// src/components/Signup.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', { name, email, password });
      setSuccessMessage('User created successfully');
      // Clear input fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error:', error.response.data.error);
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Sign Up</h2>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-12">
              <label htmlFor="inputName" className="form-label">Name</label>
              <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputPassword" className="form-label">Password</label>
              <div className="input-group">
                <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
