import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../assets/css/login.css";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', loginData);
      if (response.data.success) {
        alert('Login successful');
        navigate('/home', { state: { name: response.data.name, customerType: response.data.customerType } }); // Replace '/' with your home route
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Check your email and password again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="creat-account-by">
      <img className="right-image" alt="Right image" src="https://c.animaapp.com/XCVI8hC1/img/right-image.png" />
      <div className="body">
        <div className="label-content">
          <div className="heading">Login</div>
          <form onSubmit={handleLogin}>
          <div className="content">
            <div className="tabs">
              <div className="div">
                <div className="left-tabs">
                  <div className="by-email">
                    <div className="text-wrapper">Restaurant</div>
                  </div>
                  <div className="line" />
                </div>
                <div className="right-tab">
                  <div className="text-wrapper-2">Retail</div>
                </div>
              </div>
              <div className="rectangle" />
            </div>
            <div className="email">
              <input type="email" name="email" onChange={handleInputChange} className="border-0 w-100" placeholder="Enter your Email"/>
            </div>
            <div className="create-password">
              <input type="password" name="password" onChange={handleInputChange} className="border-0 w-100" placeholder="Enter your password"/>
            </div>
            <button type="submit" className="button-div-wrapper">
              Enter
            </button>
          </div>
        </form>
      </div>
      </div>
      <img className="re-up-logo" alt="Re up logo" src="https://c.animaapp.com/XCVI8hC1/img/re-up--logo-@2x.png" />
    </div>
  );
};


export default Login;