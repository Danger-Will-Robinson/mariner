import React from 'react';

const Comments = (props) => (
  <div>
    <ul>
    	{props.comments.map((comment) => {
    	  return <div key="comment.idcomments"><li>{comment.comment}</li></div>	
    	})}
    </ul>
  </div>
)


  


export default Comments;