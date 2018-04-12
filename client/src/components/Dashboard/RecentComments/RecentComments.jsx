import React from 'react';
import classes from './RecentComments.css';

import Comment from '../../Comments/Comment/Comment.jsx';

const recentComments = (props) => {
  // Extract the first three comments from props:
  console.log('props is ', props)
  const firstThreeComments = props.comments.slice(0,3);

  // Store the Comments components in 'recentsList':
  const recentsList = firstThreeComments.map((comment) =>
    <Comment key={comment.idcomments} comment={comment} clicked={props.commentClicked} />
  );

  // Render the recentsList const:
  return (
    <div className={classes.commentsColumn}>
      {recentsList}
    </div>
  );
}

export default recentComments;