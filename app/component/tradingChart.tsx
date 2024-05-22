"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts';
import { StockData } from '../utils/dataFetcher';

interface TradingChartProps {
    data: StockData[]
}

const TradingChart = ({data} : TradingChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart 
        width={1000}
        height={300}
        data={data}
        className='m-6'
      >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis domain={[120, 140]}/>
      <Tooltip />
      <Legend />
      <Line type="basis" dataKey="close" stroke="#8884d8" strokeWidth={3} dot={false} />
    </LineChart>
    </ResponsiveContainer>
   
  );
};

export default TradingChart;
