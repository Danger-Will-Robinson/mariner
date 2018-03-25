import React from 'react';
import classes from './RecentComments.css';

import Comment from '../../Comments/Comment/Comment.jsx';

const recentComments = (props) => (
  <div className={classes.commentsColumn}>
    <Comment />
    <Comment /> 
    <Comment /> 
  </div>
);

export default recentComments;