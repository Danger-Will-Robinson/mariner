import React from 'react';
import classes from './Main.css';

import NavBar from '../../components/NavBar/NavBar.jsx';
import NoContentError from '../../components/NoContentError/NoContentError.jsx';

const main = (props) => (
  <div className={classes.Main}>
  <NavBar />
  <NoContentError />
    <ul>
      <li>SideBar</li>
      <li>ContentArea</li>
      <li>Footer</li>
    </ul>
  </div>
);

export default main;