import React from 'react';
import classes from './NavBar.css';
import MarinerLogo from '../../../assets/simple-boat-icon-73971.png';
import TitleBar from './TitleBar/TitleBar.jsx';
import NavServiceSelector from './NavServiceSelector/NavServiceSelector.jsx';

const navBar = (props) => (
  <div className={classes.NavBar}>
    <img src={MarinerLogo} className={classes.appLogo}></img>
    <TitleBar serviceName="YouTube" />
    <NavServiceSelector />
    <div className={classes.logOutButton}>
      <span className={classes.logOutText}>
        Log Out
      </span>
    </div>
  </div>
);

export default navBar;