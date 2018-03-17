import React from 'react';

const Comments = (props) => (
  <div>
    <ul class="comment">
    	{props.comments.map((comment) => {
    	  return <div key="comment.idcomments"><li class="comment">{comment.comment}</li></div>	
    	})}
    </ul>
  </div>
)


  


export default Comments;