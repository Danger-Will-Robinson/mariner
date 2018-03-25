import React from 'react';
import classes from './ServiceSelector.css';

import YouTubeLogo from '../../../assets/youtube-square.svg';
import GoogleLogo from '../../../assets/google.svg';
import TwitterLogo from '../../../assets/twitter-square.svg';
import TwitchLogo from '../../../assets/twitch.svg';

const serviceSelector = (props) => (
  <div className={classes.loginOptionsRow}>
    <p className={classes.loginChoicePrompt}>
      Choose a service to start with.
    </p>
    <a href="http://localhost:3000/auth/youtube">
    <img src={YouTubeLogo} className={classes.loginYoutube}></img>
    </a>
    <img src={GoogleLogo} className={classes.loginGoogle}></img>
    <img src={TwitterLogo} className={classes.loginTwitter}></img>
    <img src={TwitchLogo} className={classes.loginTwitch}></img>
  </div>
);

export default serviceSelector;