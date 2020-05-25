import React from 'react'
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
// } from 'recharts';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function Chart(props) {
  const {data} = props;


  return (
    <div>
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="appointments" fill="#8884d8" />
      </BarChart>
    </div>
  )
}
