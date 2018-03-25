import React from 'react';
import classes from './TitleBar.css';

const titleBar = (props) => (
  <div className={classes.TitleBar}>
    DASHBOARD - {props.serviceName.toUpperCase()}
  </div>
);

export default titleBar;