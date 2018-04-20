import React from 'react';
import classes from './Videos.css'
import NavBar from '../../components/NavBar/NavBar.jsx'
// added a comment
const Videos = (props) => {
  return (
    <div>
      <NavBar className={classes.videoList} serviceName={props.serviceName} changeView={props.changeView}/>
      <ul className={classes.gridContainer}>
        {props.videos.map((video) => {
        return <div className={classes.video} onClick={function(){props.pass(video)}}key={video.idvideos}><li><img src={video.lowRes}></img></li><div className="commentNumber">comments: {video.commentCount ? video.commentCount : '0'}</div><a>{video.title}</a></div>
        })}
      </ul>
    </div>  

  )
  
}

export default Videos;
