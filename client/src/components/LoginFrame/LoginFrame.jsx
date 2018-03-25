import React from 'react';
import classes from './LoginFrame.css';
import ServiceSelector from '../ServiceSelector/ServiceSelector.jsx';
import MarinerLogo from '../../../assets/simple-boat-icon-73971.png';

const loginFrame = (props) => (
  <div className={classes.loginFrame}>
    <img src={MarinerLogo} className={classes.loginLogo}></img>
    <h1 className={classes.appTitle}>M A R I N E R</h1>
    <ServiceSelector />
  </div>
);

export default loginFrame;