import React from 'react';
import classes from './Main.css';

const main = (props) => (
  <div className={classes.Main}>
    <ul>
      <li>Navbar</li>
      <li>SideBar</li>
      <li>ContentArea</li>
      <li>Footer</li>
    </ul>
  </div>
);

export default main;