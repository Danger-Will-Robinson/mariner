import React from 'react';
import Classes from './GraphModal.css'

import { XAxis, YAxis, LineChart, Line, CartesianGrid } from 'recharts'




const Charts = (props) => {
  //let data = [{'uv': 200, 'Score!': -5}, {'uv': 300, 'Score!': 0}, {'uv': 500, 'Score!': 5}];
  const sentaments = {
    'Glowing': 'Glowing',
    'Praise': 'Praise',
    'Positive': 'Positive',
    'Warm': 'Warm',
    'Nuetral': 'Nuetral',
    'Shade': 'Shade',
    'Negative': 'Negative',
    'Mean': 'Mean',
    'Hostile': 'Hostile' 
  }
  let data = props.countAnalyzed(props.comments)
  console.log('props. comments ', props.comments)

  return(
    <div>
      <div>
        <LineChart className={Classes.LineChart} height={400} width={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="Score!" />
          <YAxis />
        </LineChart>      
      </div>
      <ul className={Classes.buttonList}> 
        <button onClick={function(){props.filterSentaments(sentaments.Glowing)}}>Filter {sentaments.Glowing}</button>
        <button onClick={function(){props.filterSentaments(sentaments.Praise)}}>Filter {sentaments.Praise}</button>
        <button onClick={function(){props.filterSentaments(sentaments.Positive)}}>Filter {sentaments.Positive}</button>
        <button onClick={function(){props.filterSentaments(sentaments.Warm)}}>Filter {sentaments.Warm}</button>
        <button onClick={function(){props.filterSentaments(sentaments.Nuetral)}}>Filter {sentaments.Nuetral}</button>
        <button onClick={function(){props.filterSentaments(sentaments.Shade)}}>Filter {sentaments.Shade}</button>
        <button onClick={function(){props.filterSentaments(sentaments.Negative)}}>Filter {sentaments.Negative}</button>
        <button onClick={function(){props.filterSentaments(sentaments.Mean)}}>Filter {sentaments.Mean}</button>
        <button onClick={function(){props.filterSentaments(sentaments.Hostile)}}>Filter {sentaments.Hostile}</button>
      </ul>
          
       
    </div>
  )
  
}

export default Charts;