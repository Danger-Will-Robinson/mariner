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
  // State needs to track the log in option the user chooses.
  // state = {
  //   logInUsed: null 
  // }

  render() {
    return (
      <Aux>
        <div>Log In Sheet</div>
        <LoginFrame />
        <form action="http://localhost:3000/auth/youtube">
          <input type="submit" value="Log In With YouTube" />
        </form>
        <form action="http://localhost:3000/auth/logout">
          <input type="submit" value="Log Out" />
        </form>
        <div>YouTube</div>
        <div>Google</div>
      </Aux>
    );
  }
}

export default Login;