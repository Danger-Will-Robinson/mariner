import React from 'react';
import moment from 'moment';

const Comments = (props) => (
  <div>
    <ul className="comment">
    	{props.comments.map((comment) => {
    	  return (
        <div key="comment.idcomments">
          <li className="comment">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHKSURBVGhD7dlLKwVhHMfx47KjKMnO0kJ2RHkL1qzkHt4Ba+WSsOAtKEKxcllZsiC3d0C8AZKF2/dfMyX99Txzmv944vnVZzMzz3/m15lTc86UYmJiykoVRnGEs0DItQyhEl6REjv4CNQ25BqdkU9CGxCSYThzCG1xSA7gzDW0xSGRa3QmFilQLFKOJ+xiObGXbNOOzaqQIu9YQj2+R7atQI7R1voqpMg4XJmAttaXeZF1+GYD2gwf5kVa4Zs2aDN8mBa5RdbcQZvlYlrkBFkja7RZLqZFrpA15Z7LtMgzauEbOfYF2iwX0yJiBL4ZgzbDh3mRezTClSY8QJvhw7yIuEAzforsk2O0tb4KKSIeMYt21CQ6MAfZp63JorAi1mKR0MQiPuQ3xg3WMIkedEK+8KIr2Sb7VnGJV2izXEyKnKIfDciaOvRC/kV8gzZfk2uRc3Qjr7RgEz6/HnMrsoBqWKQPrjK5FJFbqQKW2Yd27lQuRRZhnRlo507lUmQe1pmGdu5ULPLVMaaMyb/t2rlTuRQJQSwSmv9V5M+8epMXjdrikAzAGXmPvQVtQAjkwdL7EUnKDEJuM+3l/W+Q20muyfo5LybmD6ZU+gQZuYMYAr3xRQAAAABJRU5ErkJggg=="></img>
            <div className="userComment">{comment.comment}</div>
            <div className="commentFooter"> - {comment.author}    ({moment(comment.timestamp).calendar()})</div>
          </li>
        </div>	
        )
    	})}
    </ul>
  </div>
)


  


export default Comments;