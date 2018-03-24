import React from 'react';

import YouTubeLogo from '../../../assets/youtube-square.svg';
import GoogleLogo from '../../../assets/google.svg';

const serviceSelector = (props) => (
  <div className="login-options-row">
    <img src={YouTubeLogo} className="login-youtube"></img>
    <img src={GoogleLogo} className="login-google"></img>
  </div>
)

export default serviceSelector;