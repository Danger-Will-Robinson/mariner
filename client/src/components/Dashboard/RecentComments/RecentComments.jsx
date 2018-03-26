import React from 'react';
import classes from './RecentComments.css';

import Comment from '../../Comments/Comment/Comment.jsx';

const recentComments = (props) => (
  <div className={classes.commentsColumn}>
    <Comment comment={props.comments[0]}/>
    <Comment comment={props.comments[1]}/> 
    <Comment comment={props.comments[2]}/> 
  </div>
);

export default recentComments;