import React from 'react';
import moment from 'moment';
import classes from './Comments.css';

import Comment from './Comment/Comment.jsx';

const Comments = (props) => (
  <div>
    <ul className="comment">
    	{props.comments.forEach((comment) => {
    	  return (
          <li key="comment.idcomments">
            <Comment author={comment.author}/>
          </li>
        )
    	})}
    </ul>
  </div>
)


  


export default Comments;