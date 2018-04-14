import React from 'react';
import classes from './NavServiceSelector.css';

import YouTubeLogo from '../../../../assets/youtube-square.svg';
import QuestionMarkLogo from '../../../../assets/question-mark-button.svg';
import sentimentLogo from '../../../../assets/sentimentIcon.png'
// import GoogleLogo from '../../../../assets/google.svg';
// import TwitterLogo from '../../../../assets/twitter-square.svg';
// import TwitchLogo from '../../../../assets/twitch.svg';

const navServiceSelector = (props) => (
  <div>
    <img onClick={function(){props.changeView('videos')}}src={YouTubeLogo} className={classes.serviceIcon}></img>
    <img src={QuestionMarkLogo} className={classes.questionIcon}></img>
    <img src ={sentimentLogo} className={classes.sentimentIcon}></img>
  </div>
  
    
  
);

export default navServiceSelector;