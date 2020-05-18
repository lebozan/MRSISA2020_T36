import React from 'react'
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
// } from 'recharts';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function Chart(props) {
  const {data} = props;


  return (
    <div>
      {/* <LineChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="appointments" stroke="#82ca9d" activeDot={{r:10}}/>
      </LineChart> */}
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
