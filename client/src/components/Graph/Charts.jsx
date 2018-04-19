import React from 'react';

import { XAxis, YAxis, LineChart, Line, CartesianGrid } from 'recharts'




// const Charts = (props) => (
//   <LineChart width={600} height={300} data={[1,3,4,5,6,6,7,6,5,6,5,9,1,-2,-3,4,-7,-7,8,8,8]}>
//     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//     <CartesianGrid stroke="#ccc" />
//     <XAxis dataKey="Polarity" />
//     <YAxis />
//   </LineChart>
// )

// export default Charts;  




const Charts = (props) => {
  //let data = [{'uv': 200, 'Score!': -5}, {'uv': 300, 'Score!': 0}, {'uv': 500, 'Score!': 5}];
  let data = props.countAnalyzed(props.comments)
  return(
    <div>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Score!" />
        <YAxis />
      </LineChart>
   </div>

  )
  
}

export default Charts;