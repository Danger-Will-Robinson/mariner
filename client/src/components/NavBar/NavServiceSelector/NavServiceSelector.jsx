import React from 'react';
import classes from './NavServiceSelector.css';

import YouTubeLogo from '../../../../assets/youtube-square.svg';
// import GoogleLogo from '../../../../assets/google.svg';
// import TwitterLogo from '../../../../assets/twitter-square.svg';
// import TwitchLogo from '../../../../assets/twitch.svg';

const navServiceSelector = (props) => (
  <img src={YouTubeLogo} className={classes.serviceIcon}></img>
);

export default navServiceSelector;