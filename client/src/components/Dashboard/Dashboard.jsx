import React from 'react';
import classes from './Dashboard.css';
import RecentComments from './RecentComments/RecentComments.jsx';
import ActiveContent from './ActiveContent/ActiveContent.jsx';

const dashBoard = (props) => (
  <div>
    <p className={classes.activeContentTitle}>
      Active Content
    </p>
    <ActiveContent video={props.activeContent}/>
    <p className={classes.recentCommentTitle}>
      Recent Comments
    </p>
    <div>
    <RecentComments comments={props.recentComments} currentTitle={props.currentTitle} commentClicked={props.commentClicked}/>
    </div>
  </div>
);

export default dashBoard;