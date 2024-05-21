"use client"

import * as tfvis from '@tensorflow/tfjs-vis'
import * as tf from '@tensorflow/tfjs'
import { Row, Col, Card, Tag } from "antd"
import { use, useEffect, useState } from "react"
import TradingEnv from '../component/tradingEnv'


export default function Chapter8(){
    const [visor, setVisor] = useState<any>()

    useEffect(() => {
        const visor = tfvis.visor();
        visor.el.style.color = 'black';
        setVisor(visor)
  
        return () => {
          tf.disposeVariables()
      }
    }, [])
    
    return (
<div>
            <Row>
            <Col span={24} className="m-4">
            <Card title="Description">
                <Tag color="orange">Tensorflow.js</Tag><Tag color="purple">Recharts</Tag>
                <Tag style={{cursor : "pointer"}} color="green" onClick={() => visor.toggle()}>Show Visor</Tag>
            </Card>
            </Col>
            </Row>
            <Row>
            <Col span={24} className="m-4">
            <Card title="" style={{ height: '500px', display: 'flex' }}>
              <TradingEnv />
                </Card>
            </Col>
            </Row>
        </div>
    )
}