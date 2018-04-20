import React from 'react';
import classes from './Login.css';

import Aux from '../../hoc/Aux.jsx';
import LoginFrame from '../../components/LoginFrame/LoginFrame.jsx';

const logInOptions = ['youtube', 'twitter', 'google', 'twitch'];

const Login = (props) => 
(
  <Aux >
    <LoginFrame />
  </Aux>
);

export default Login;