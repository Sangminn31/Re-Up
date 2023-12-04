import React, { useState } from "react";
import axios from 'axios';
import retailStoreImage from '../assets/retail-store-management-process.jpg';
import "../assets/css/signup.css";
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    customerType: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/signup', formData);
      alert(response.data);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Email already in use');
      } else {
        alert('An error occurred while submitting the form');
      }
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="creat-account-by">
      <img className="right-image" alt="Right image" src={retailStoreImage} />
      <div className="body">
        <div className="label-content">
          <div className="heading">Sign Up</div>
        </div>
        <form
        onSubmit={handleSubmit}>
      <div className="mt-4">Email</div>
      <input type="email" name="email" onChange={handleInputChange} className="border-2" placeholder="Email" />
      <div className="mt-4">Password</div>
      <input type="password" name="password" onChange={handleInputChange} className="border-2" placeholder="Password" />
      <div className="mt-4">Re-Password</div>
      <input type="password" name="rePassword" onChange={handleInputChange} className="border-2" placeholder="Re-type Password" />
      <div className="mt-4">Name</div>
      <input type="text" name="name" onChange={handleInputChange} className="border-2" placeholder="Name"/>
      <div className="mt-4">Customer Type</div>
      <select name="customerType" onChange={handleInputChange} className="border-2">
        <option value="blank">Select One</option>
        <option value="restaurant">Restaurant</option>
        <option value="wholesale">Retail</option>
      </select>
      <div className="mt-4">Address</div>
      <input type="text" name="address" onChange={handleInputChange} className="address-input border-2" placeholder="Address"/>
        <br/>
      <button type="submit" className="mt-4">Submit</button>
    </form>
      </div>
      <img className="re-up-logo" alt="Re up logo" src="https://c.animaapp.com/XCVI8hC1/img/re-up--logo-@2x.png" />
    </div>
  );
};


export default SignUp;