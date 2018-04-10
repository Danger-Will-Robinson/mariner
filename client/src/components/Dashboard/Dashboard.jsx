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
    <RecentComments comments={props.recentComments} commentClicked={props.commentClicked}/>
  </div>
);

export default dashBoard;