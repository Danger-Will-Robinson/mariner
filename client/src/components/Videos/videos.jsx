import React from 'react';
import classes from './Videos.css'
import NavBar from '../../components/NavBar/NavBar.jsx'
// added a comment
const Videos = (props) => {
  console.log('props in videos.jsx ', props)
  return (
    <div>
      <NavBar className={classes.videoList} serviceName={props.serviceName} changeView={props.changeView}/>
      <ul className={classes.gridContainer}>
        {props.videos.map((video) => {
        console.log('video', video)
        return <div key={video.idvideos}><li><img src={video.thumbnailUrl}></img></li><div className="commentCount">comments: {video.commentCount ? video.commentCount : '0'}</div><a onClick={function(){props.pass(video)}}>{video.title} See Content</a></div>
        })}
      </ul>
    </div>  

  )
  
}

export default Videos;
