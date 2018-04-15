import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

let data = [{'uv': 200, 'Score!': -5}, {'uv': 300, 'Score!': 0}, {'uv': 500, 'Score!': 5}];

const testChart = (props) => (
  <div>
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="Score!" />
      <YAxis />
    </LineChart>
  </div>
);

export default testChart;