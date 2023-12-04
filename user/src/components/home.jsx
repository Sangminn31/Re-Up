import React, { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "../assets/css/login.css";

export const Home = () => {
    const location = useLocation();
    const { name, customerType } = location.state || { name: 'Guest', customerType: 'Unknown' };
  
  return (
    <div className="creat-account-by">
      <img className="right-image" alt="Right image" src="https://c.animaapp.com/XCVI8hC1/img/right-image.png" />
      <div className="body">
        <div className="label-content">
          <div className="content">
            <div className="tabs">
              <div className="div">
                <div className="left-tabs">
                <div>Welcome, {name}! Your customer type is {customerType}.</div>
                  </div>
                  </div>
          </div>
      </div>
      </div>
      </div>
      <img className="re-up-logo" alt="Re up logo" src="https://c.animaapp.com/XCVI8hC1/img/re-up--logo-@2x.png" />
    </div>
  );
};


export default Home;