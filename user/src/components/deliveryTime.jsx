import React from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/css/signup.css";
import deliveryTimeImage from '../assets/deliveryTime.jpg';
export const DeliveryTime = () => {
  const location = useLocation();
  const { orderDetails } = location.state || { orderDetails: {} };

  return (
    <div className="creat-account-by">
      <img className="right-image" alt="Right image" src={deliveryTimeImage} />

      {/* 주문 정보 영역 */}
      <div className="body">
        <div className="label-content">
          <div className="heading">Delivery Details</div>
          <div className="order-info">
            <strong>Product Name:</strong> {orderDetails.productName}<br />
            <strong>Quantity:</strong> {orderDetails.quantity}<br />
            <strong>Price:</strong> ${orderDetails.price}<br />
            <strong>Delivery Date:</strong> {new Date(orderDetails.deliveryDate).toLocaleDateString()}<br />
            <strong>Total Price:</strong> ${(orderDetails.quantity * orderDetails.price).toFixed(2)}<br />
            {/* 기타 필요한 정보 추가 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTime;