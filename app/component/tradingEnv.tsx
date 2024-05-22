
import React, { useState, useEffect, useRef } from 'react';
import { fetchStockData, StockData } from '../utils/dataFetcher';
import { Card, Col, Row, Tag } from 'antd';
import { EuroCircleOutlined } from '@ant-design/icons';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import TradingChart from './tradingChart';

const BATCH_SIZE = 32;

 function TradingEnv(){
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [reward, setReward] = useState<number>(0);
  const [portfolio, setPortfolio] = useState<number>(5000);
  const [lastTrade, setLastTrade] = useState<number>(0); // Assurez-vous que c'est un nombre


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
        <Row gutter={16} className="flex-auto m-4">
          <Col span={12}>
          <Card >
          <p>Porte-feuille: <Tag color={portfolio > 0 ? 'green' : portfolio < 0 ? 'red' : 'gray'}>{portfolio} <EuroCircleOutlined /></Tag></p>
          <p>Reward:<Tag color={reward > 0 ? 'green' : reward < 0 ? 'red' : 'gray'}>{reward}</Tag></p>
          <p>Last Trade <Tag color={lastTrade > 0 ? 'green' : lastTrade < 0 ? 'red' : 'gray'}>{lastTrade}</Tag></p> 
        </Card>
          </Col>
        <Col span={12}>
        <Card >
          {/** Here canvas to see training in 3D */}
          <Canvas className='bg-gradient-to-r from-slate-500 to-slate-700 rounded-sm w-100'>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Text color={"gold"}>
              HERE TRAINING VISUALISATION IN 3D WILL COME
            </Text>
          </Canvas>
        </Card>
        </Col>
        </Row>
      <TradingChart data={data} />
    </div>
  );
};

export default TradingEnv;


