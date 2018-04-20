import React from 'react';
import Classes from './GraphModal.css'

import { XAxis, YAxis, LineChart, Line, CartesianGrid } from 'recharts'




const Charts = (props) => {
  //let data = [{'uv': 200, 'Score!': -5}, {'uv': 300, 'Score!': 0}, {'uv': 500, 'Score!': 5}];
  //console.log('props.comments ', props.comments)
  const sentiments = {
    'Glowing': 'Glowing',
    'Praise': 'Praise',
    'Positive': 'Positive',
    'Warm': 'Warm',
    'Neutral': 'Neutral',
    'Unpleasant': 'Unpleasant',
    'Negative': 'Negative',
    'Mean': 'Mean',
    'Hostile': 'Hostile' 
  }
  //console.log('props comments ', props.comments)
  let data = props.countAnalyzed(props.comments)

  return(
    <div>
      <div>
        <LineChart className={Classes.LineChart} height={400} width={400} data={data}>
          <Line ClassName={Classes.line}type="monotone" dataKey="uv" stroke="red" />
          <CartesianGrid stroke="#ccc" />
          <XAxis stroke="black" dataKey="Score!" />
          <YAxis stroke="black"/>
        </LineChart>      
      </div>
      <ul className={Classes.buttonList}> 
        <button className={Classes.Button} onClick={function(){props.filterSentiments(sentiments.Glowing)}}>Glowing</button>
        <button className={Classes.Button} onClick={function(){props.filterSentiments(sentiments.Praise)}}>Praise</button>
        <button className={Classes.Button} onClick={function(){props.filterSentiments(sentiments.Positive)}}>Positive</button>
        <button className={Classes.Button} onClick={function(){props.filterSentiments(sentiments.Warm)}}>Warm</button>
        <button className={Classes.Button} onClick={function(){props.filterSentiments(sentiments.Nuetral)}}>Neutral</button>
        <button className={Classes.Button} onClick={function(){props.filterSentiments(sentiments.Unpleasant)}}>Unpleasant</button>
        <button className={Classes.Button} onClick={function(){props.filterSentiments(sentiments.Negative)}}>Negative</button>
        <button className={Classes.Button} onClick={function(){props.filterSentiments(sentiments.Mean)}}>Mean</button>
        <button className={Classes.Button} onClick={function(){props.filterSentiments(sentiments.Hostile)}}>Hostile</button>
      </ul>
          
       
    </div>
  )
  
}

export default Charts;