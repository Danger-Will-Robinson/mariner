import React from 'react';
import classes from './Video.css';

const video = (props) => {
  {console.log('props in video is ', props)}
  return (
    <div>
    <img src={props.video.thumbnailURL || "https://i.ytimg.com/vi/lDi9uFcD7XI/maxresdefault.jpg"} className={classes.thumbnail}></img>
    <p className={classes.videoTitle}>{props.video.title || "Robbie Maddison's Pipe Dream"}</p>
    </div>

  )

  
}

export default video;