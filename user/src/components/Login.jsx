import React from "react";
import "../assets/css/login.css";

export const login = () => {
  return (
    <div className="creat-account-by">
      <img className="right-image" alt="Right image" src="https://c.animaapp.com/XCVI8hC1/img/right-image.png" />
      <div className="body">
        <div className="label-content">
          <div className="heading">Login</div>
          <div className="content">
            <div className="tabs">
              <div className="div">
                <div className="left-tabs">
                  <div className="by-email">
                    <div className="text-wrapper">Staff</div>
                  </div>
                  <div className="line" />
                </div>
                <div className="right-tab">
                  <div className="text-wrapper-2">Management</div>
                </div>
              </div>
              <div className="rectangle" />
            </div>
            <div className="email">
              <div className="text">Enter your email</div>
            </div>
            <div className="create-password">
              <div className="text-2">Create password</div>
              <img className="eye" alt="Eye" src="eye.png" />
            </div>
          </div>
        </div>
        <button className="CTA">
          <button className="div-wrapper">
            <div className="text-wrapper-3">Continue</div>
          </button>
        </button>
      </div>
      <img className="re-up-logo" alt="Re up logo" src="https://c.animaapp.com/XCVI8hC1/img/re-up--logo-@2x.png" />
    </div>
  );
};


export default login;