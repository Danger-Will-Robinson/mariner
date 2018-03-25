import React from 'react';
import moment from 'moment';
import classes from './Comment.css';
import UserIconLight from '../../../../assets/user-circle.svg';

const comment = (props) => (
  <div className={classes.Comment}>
    <img src={UserIconLight} className={classes.userIcon}></img>
    <p className={classes.userName}>{props.author || "Username"}</p>
    <p className={classes.commentText}>{props.comment || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel molestie libero, ut varius nulla. Pellentesque eleifend nunc eu vulputate fermentum. "}</p>
    <p className={classes.commentTime}>{moment(comment.timestamp).calendar() || "Today, 2:04PM"}</p>
  </div>
);

export default comment;