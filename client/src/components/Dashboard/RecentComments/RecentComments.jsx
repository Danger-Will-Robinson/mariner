import React from 'react';
import classes from './RecentComments.css';

import Comment from '../../Comments/Comment/Comment.jsx';

const recentComments = (props) => (
  <div className={classes.commentsColumn}>
    <Comment comment={props.comments[0]} clicked={props.commentClicked}/>
    <Comment comment={props.comments[1]} clicked={props.commentClicked}/> 
    <Comment comment={props.comments[2]} clicked={props.commentClicked}/> 
  </div>
);

export default recentComments;