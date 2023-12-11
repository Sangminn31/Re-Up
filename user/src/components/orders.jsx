import React, { useState, useEffect } from "react";
import axios from 'axios';
import orderImage from '../assets/order.jpg';
import "../assets/css/signup.css";
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Order = () => {
  const [orderData, setOrderData] = useState({
    customerName: '',
    orderDetails: '',
    quantity: 1,
    deliveryDate: new Date(),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    if (location.state && location.state.item) {
      setSelectedItem(location.state.item);
      setOrderData(prevState => ({
        ...prevState,
        productName: location.state.item.productName,
        price: location.state.item.price,
        quantity: 1,
        customerName: localStorage.getItem('userName') || '' 
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setOrderData(prevState => ({
      ...prevState,
      deliveryDate: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullOrderData = {
        ...orderData,
        productId: selectedItem._id,
      };

      const response = await axios.post('http://localhost:3001/orders', fullOrderData);
      console.log(response.data);
      alert('Order successfully added!');
      navigate('/deliveryTime', { 
        state: { 
          orderDetails: { 
            ...response.data, 
            productName: selectedItem.productName, 
            price: selectedItem.price, 
            brandName: selectedItem.brandName,
            productType: selectedItem.productType,
            quantity: orderData.quantity, 
            deliveryDate: orderData.deliveryDate 
          } 
        } 
      });

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="creat-account-by">
      <img className="right-image" alt="Right image" src={orderImage} />
      <div className="body">
        <div className="label-content">
          <div className="heading">Order</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <strong>Product:</strong> {selectedItem.productName || ''}
            <br />
            <strong>Price:</strong> ${selectedItem.price || 0}
            <br />
            <strong>Brand:</strong> {selectedItem.brandName || ''}
            <br />
            <strong>Type:</strong> {selectedItem.productType || ''}
            <br />
            {selectedItem.productImage && (
              <img
                src={`http://localhost:3001/${selectedItem.productImage}`}
                alt={selectedItem.productName}
                style={{ maxWidth: '250px', height: 'auto' }}
              />
            )}
          </div>
          <div>
            <label><strong>Customer Name:</strong></label>
            <input
              type="text"
              name="customerName"
              value={orderData.customerName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><strong>Order Details:</strong></label>
            <textarea
              name="orderDetails"
              value={orderData.orderDetails}
              onChange={handleInputChange}
              style={{ width: '100%', height: '100px' }}
            />
          </div>
          <div>
            <label><strong>Quantity:</strong></label>
            <input
              type="number"
              name="quantity"
              value={orderData.quantity}
              onChange={handleInputChange}
              min="1"
            />
          </div>
          <div>
            <label><strong>Delivery Date:</strong></label>
            <DatePicker
              selected={orderData.deliveryDate}
              onChange={handleDateChange}
            />
          </div>
          <button type="submit" className="mt-4">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Order;