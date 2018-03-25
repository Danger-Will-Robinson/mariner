import React from 'react';

import YouTubeLogo from '../../../assets/youtube-square.svg';
import GoogleLogo from '../../../assets/google.svg';
import TwitterLogo from '../../../assets/twitter-square.svg';
import TwitchLogo from '../../../assets/twitch.svg';

const serviceSelector = (props) => (
  <div className="login-options-row">
    <p className="login-choice-prompt">
      Choose a service to start with.
    </p>
    <a href="http://localhost:3000/auth/youtube">
    <img src={YouTubeLogo} className="login-youtube"></img>
    </a>
    <img src={GoogleLogo} className="login-google"></img>
    <img src={TwitterLogo} className="login-twitter"></img>
    <img src={TwitchLogo} className="login-twitch"></img>
  </div>
)

export default serviceSelector;