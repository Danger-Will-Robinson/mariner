import React from 'react';

const Videos = (props) => (
  <div>
    <ul className="grid-container">
      {props.videos.map((video) => {
      	return <div key={video.idvideos}><li><img src={video.thumbnailURL}></img></li><a>{video.title}</a></div>

      })}
    </ul>
  </div>	

)

export default Videos;
