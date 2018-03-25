import React from 'react';
import classes from './NoContentError.css';
import ErrorLogo from '../../../assets/window-close.svg';
import YouTubeLogo from '../../../assets/youtube-square.svg';

const noContentError = (props) => (
  <div className={classes.NoContentError}>
    <img src={ErrorLogo} className={classes.errorWindowLogo}></img>
    <p className={classes.errorTitle}>NO CONTENT</p>
    <p className={classes.errorText}>
    Upload content to your YouTube channel in order to see videos and their respective comments listed here, along with our analysis.
    </p>
    <p className={classes.visitText}>
      Visit <a href="http://www.youtube.com">YouTube</a>
    </p>
  </div>
)

export default noContentError;