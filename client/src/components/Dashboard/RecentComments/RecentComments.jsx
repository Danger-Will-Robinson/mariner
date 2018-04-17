import React from 'react';
import classes from './RecentComments.css';

import Comment from '../../Comments/Comment/Comment.jsx';

const recentComments = (props) => {
  // Extract the first three comments from props:
  console.log('props in recentComments ', props)
  let commentsToRender = []
  //props.currentTitle === '' ? commentsToRender = props.comments.slice(0,3) : commentsToRender = props.comments 
  console.log('props.comments in recentscomments ', props.comments)
  if (props.currentTitle === '') {
    commentsToRender = props.comments.slice(0,3)
  } else {
    commentsToRender = props.comments
  }


  // Store the Comments components in 'recentsList':
  console.log('commentsToRender ', commentsToRender)
  const recentsList = commentsToRender.map((comment) =>
    <Comment key={comment.idcomments} comment={comment} clicked={props.commentClicked} passComment={function(){props.passComment(comment)}} renderReplyAll={function(){props.renderReplyAll()}} replyAll={function(){props.replyAll(comment)}}/>
  );

  // Render the recentsList const:
  return (
    <div className={classes.commentsColumn}>
      {recentsList}
    </div>
  );
}

export default recentComments;