"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StockData } from '../utils/dataFetcher';

interface TradingChartProps {
    data: StockData[]
}

const TradingChart = ({data} : TradingChartProps) => {
  return (
        <LineChart width={1000} height={400} data={data} className='m-6'>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart>
  );
};

export default TradingChart;
