import React from 'react';
import classes from './Main.css';

import NavBar from '../../components/NavBar/NavBar.jsx';
import NoContentError from '../../components/NoContentError/NoContentError.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';

const main = (props) => (
  <div className={classes.Main}>
  <NavBar />
  <Dashboard />
    <ul>
      <li>SideBar</li>
      <li>ContentArea</li>
      <li>Footer</li>
    </ul>
  </div>
);

export default main;