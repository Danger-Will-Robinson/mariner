import React from 'react';
import classes from './ActiveContent.css';
import Video from '../../Videos/Video/Video.jsx';

const activeContent = (props) => (
  <div className={classes.activeColumn}>
    <Video />
  </div>
);

export default activeContent;