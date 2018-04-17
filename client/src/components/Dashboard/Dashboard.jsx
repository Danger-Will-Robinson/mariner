import React from 'react';
import classes from './Dashboard.css';
import RecentComments from './RecentComments/RecentComments.jsx';
import VerticalNavBar from './VerticalNavBar/VerticalNavBar.jsx';
import ActiveContent from './ActiveContent/ActiveContent.jsx';



const dashBoard = (props) => {

  return ( 
    <div>
      <p className={classes.activeContentTitle}>
        Active Content
      </p>
        <ActiveContent video={props.activeContent}/>
      <p className={classes.recentCommentTitle}>
        {props.commentDescription}
      </p>
      <div>
      <RecentComments comments={props.recentComments} currentTitle={props.currentTitle} commentClicked={props.commentClicked} passComment={props.passComment} renderReplyAll={props.renderReplyAll} replyAll={props.replyAll}/>
      </div>
    </div>
  )
 }

export default dashBoard;