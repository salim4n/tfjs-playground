import React, { useState, useEffect, useRef } from 'react';
import { fetchStockData } from '../utils/dataFetcher';
import TradingChart from './tradingChart';
import { Card, Tag } from 'antd';

const BATCH_SIZE = 32;

const TradingEnv = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reward, setReward] = useState(0);
  const [porteFeuille, setPorteFeuille] = useState(5000);
  const [lastTrade, setLastTrade] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const stockData = await fetchStockData('AAPL', 'minute', '2023-01-01', '2023-01-31');
      setData(stockData);
      setLoading(false);
    };
    getData();
  }, []);




  return (
    <div>
        <h1>Trading Environment</h1>
        <p>Stock data for AAPL in January 2023</p>
        <Card>
          <p>Porte-feuille: <Tag color={porteFeuille > 0 ? 'green' : porteFeuille < 0 ? 'red' : 'gray'}>{porteFeuille}</Tag></p>
          <p>Reward:<Tag color={reward > 0 ? 'green' : reward < 0 ? 'red' : 'gray'}>{reward}</Tag></p>
          <p>Last Trade <Tag color={lastTrade > 0 ? 'green' : lastTrade < 0 ? 'red' : 'gray'}>{lastTrade}</Tag></p> 
        </Card>

      <TradingChart data={data} />
    </div>
  );
};

export default TradingEnv;
