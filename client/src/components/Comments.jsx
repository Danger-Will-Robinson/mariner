import React from 'react';

const Comments = (props) => (
  <div>
    <ul className="comment">
    	{props.comments.map((comment) => {
    	  return <div key="comment.idcomments"><li className="comment">{comment.comment}</li></div>	
    	})}
    </ul>
  </div>
)


  


export default Comments;