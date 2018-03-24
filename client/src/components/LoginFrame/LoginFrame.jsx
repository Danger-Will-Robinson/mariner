import React from 'react';
import ServiceSelector from '../ServiceSelector/ServiceSelector.jsx';
import MarinerLogo from '../../../assets/simple-boat-icon-73971.png';

const loginFrame = (props) => (
  <div className="login-frame">
    <img src={MarinerLogo} className="login-logo"></img>
    <h1 className="app-title">M A R I N E R</h1>
    <ServiceSelector />
  </div>
);

export default loginFrame;