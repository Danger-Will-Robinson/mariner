import React from 'react';
import classes from './Dashboard.css';
import RecentComments from './RecentComments/RecentComments.jsx';

const dashBoard = (props) => (
  <div>
    <p className={classes.activeContentTitle}>
      Active Content
    </p>
    <p className={classes.recentCommentTitle}>
      Recent Comments
    </p>
    <RecentComments />
  </div>
);

export default dashBoard;