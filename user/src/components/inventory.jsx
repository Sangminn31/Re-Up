import React, { useState } from "react";
import axios from 'axios';
import inventoryImage from '../assets/inventory.jpg';
import "../assets/css/signup.css";
import { useNavigate } from 'react-router-dom';


export const Inventory = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Instance of useNavigate

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', e.target.productName.value);
    formData.append('quantity', e.target.quantity.value);
    formData.append('productType', e.target.productType.value);
    formData.append('price', e.target.price.value);
    formData.append('brandName', e.target.brandName.value);
    formData.append('productImage', file);

    try {
      const response = await axios.post('http://localhost:3001/inventory', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Item successfully added!');
      navigate('/home'); // Redirect to inventory page
    } catch (error) {
      console.error(error);
      setMessage('Failed to add item.'); // Set error message
    }
  };

  return (
    <div className="creat-account-by">
      <img className="right-image" alt="Right image" src={inventoryImage} />
      <div className="body">
        <div className="label-content">
          <div className="heading">Inventory</div>
        </div>
        <form onSubmit={handleSubmit}>
      <div className="mt-4">Product Name</div>
      <input type="text" name="productName" className="border-2"/>
      <div className="mt-4">Quantity</div>
      <input type="text" name="quantity"className="border-2"/>
      <div className="mt-4">Product Type</div>
      <input type="text" name="productType" className="border-2" />
      <div className="mt-4">Price</div>
      <input type="text" name="price"className="border-2"/>
      <div className="mt-4">Brand Name</div>
      <input type="text" name="brandName"  className="address-input border-2"/>
      <div className="mt-4">Product Image</div>
      <input type="file" name="productImage" onChange={handleFileChange} className="address-input border-2"/>
        <br/>
      <button type="submit" className="mt-4">Submit</button>
    </form>
      </div>
      <img className="re-up-logo" alt="Re up logo" src="https://c.animaapp.com/XCVI8hC1/img/re-up--logo-@2x.png" />
    </div>
  );
};


export default Inventory;