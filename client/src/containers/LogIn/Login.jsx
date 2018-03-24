import React, { Component } from 'react';
import Aux from '../../hoc/Aux.jsx';
import LoginFrame from '../../components/LoginFrame/LoginFrame.jsx';

const logInOptions = ['youtube', 'twitter', 'google', 'twitch'];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInUsed: null
    }
  }

  render() {
    return (
      <Aux>
        <LoginFrame />
      </Aux>
    );
  }
}

export default Login;