import React from 'react';
import classes from './Spinner.css';

const Spinner = (props) => (
  <div className={classes["sk-folding-cube"]}>
    <div className={[classes["sk-cube1"],classes["sk-cube"]].join(' ')}></div>
    <div className={[classes["sk-cube2"],classes["sk-cube"]].join(' ')}></div>
    <div className={[classes["sk-cube4"],classes["sk-cube"]].join(' ')}></div>
    <div className={[classes["sk-cube3"],classes["sk-cube"]].join(' ')}></div>
  </div>
);

export default Spinner;