import React from 'react';
import NavBar from '../../components/NavBar/NavBar.jsx'

const Videos = (props) => (
  <div>
  <NavBar serviceName={props.serviceName} changeView={props.changeView}/>
    <ul className="grid-container">
      {props.videos.map((video) => {
      	return <div key={video.idvideos}><li><img src={video.thumbnailURL}></img></li><a onClick={function(){props.changeView('comments'), props.pass(video)}}>{video.title}</a></div>

      })}
    </ul>
  </div>	

)

export default Videos;
