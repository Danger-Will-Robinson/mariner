import React from 'react';
import classes from './Video.css';

const video = (props) => (
  <div>
  <img src={props.thumbnailURL || "https://i.ytimg.com/vi/lDi9uFcD7XI/maxresdefault.jpg"} className={classes.thumbnail}></img>
  <p className={classes.videoTitle}>{props.title || "Robbie Maddison's Pipe Dream"}</p>
  </div>
);

export default video;