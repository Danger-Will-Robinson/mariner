import React from 'react';
import Classes from './GraphModal.css'

import { XAxis, YAxis, LineChart, Line, CartesianGrid } from 'recharts'




const Charts = (props) => {
  //let data = [{'uv': 200, 'Score!': -5}, {'uv': 300, 'Score!': 0}, {'uv': 500, 'Score!': 5}];
  const sentiments = {
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
          <Line ClassName={Classes.line}type="monotone" dataKey="uv" stroke="red" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="Score!" />
          <YAxis />
        </LineChart>      
      </div>
      <ul className={Classes.buttonList}> 
        <button onClick={function(){props.filterSentiments(sentiments.Glowing)}}>Filter {sentiments.Glowing}</button>
        <button onClick={function(){props.filterSentiments(sentiments.Praise)}}>Filter {sentiments.Praise}</button>
        <button onClick={function(){props.filterSentiments(sentiments.Positive)}}>Filter {sentiments.Positive}</button>
        <button onClick={function(){props.filterSentiments(sentiments.Warm)}}>Filter {sentiments.Warm}</button>
        <button onClick={function(){props.filterSentiments(sentiments.Nuetral)}}>Filter {sentiments.Nuetral}</button>
        <button onClick={function(){props.filterSentiments(sentiments.Shade)}}>Filter {sentiments.Shade}</button>
        <button onClick={function(){props.filterSentiments(sentiments.Negative)}}>Filter {sentiments.Negative}</button>
        <button onClick={function(){props.filterSentiments(sentiments.Mean)}}>Filter {sentiments.Mean}</button>
        <button onClick={function(){props.filterSentiments(sentiments.Hostile)}}>Filter {sentiments.Hostile}</button>
      </ul>
          
       
    </div>
  )
  
}

export default Charts;