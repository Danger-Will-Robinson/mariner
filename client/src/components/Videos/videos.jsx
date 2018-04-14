import React from 'react';
import classes from './Videos.css'
import NavBar from '../../components/NavBar/NavBar.jsx'
// added a comment
const Videos = (props) => (
  <div>
  <NavBar className={classes.videoList} serviceName={props.serviceName} changeView={props.changeView}/>
    <ul className={classes.gridContainer}>
      {props.videos.map((video) => {
      	return <div key={video.idvideos}><li><img src={video.thumbnailURL}></img></li><a onClick={function(){props.pass(video)}}>{video.title}</a></div>

      })}
    </ul>
  </div>	

)

export default Videos;
