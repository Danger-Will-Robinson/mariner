import React from 'react';
import classes from './Dashboard.css';
import RecentComments from './RecentComments/RecentComments.jsx';
import ActiveContent from './ActiveContent/ActiveContent.jsx';

const dashBoard = (props) => (
  <div>
    <p className={classes.activeContentTitle}>
      Active Content
    </p>
    <ActiveContent />
    <p className={classes.recentCommentTitle}>
      Recent Comments
    </p>
    <RecentComments />
  </div>
);

export default dashBoard;