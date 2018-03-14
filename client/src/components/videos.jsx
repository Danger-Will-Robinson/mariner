import React from 'react';

const Videos = (props) => (
  <div>
    <ul>
      {props.videos.map((video) => {
      	return <div><li key={video.idvideos}><img src={video.thumbnailURL}></img></li><a>{video.title}</a></div>

      })}
    </ul>
  </div>	

)

export default Videos;
