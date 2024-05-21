"use client"

import {  OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { visor } from "@tensorflow/tfjs-vis";
import { Row, Col, Card, Tag } from "antd";
import * as tfvis from '@tensorflow/tfjs-vis'
import * as tf from '@tensorflow/tfjs'
import { useEffect, useState } from "react";
import ObstacleAvoidance from "../component/obstacleAvoidance";

export default function Page() {

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
                <Tag color="orange">Tensorflow.js</Tag><Tag color="purple">Three Fiber</Tag>
                <Tag style={{cursor : "pointer"}} color="green" onClick={() => visor.toggle()}>Show Visor</Tag>
            </Card>
            </Col>
            </Row>
            <Row>
            <Col span={24} className="m-4">
            <Card title="" style={{ height: '500px', display: 'flex' }}>
                <Canvas style={{background: 'lightblue',width:'100%',height: '100%'} }>
                    <OrbitControls />
                    <ambientLight />
                    <ObstacleAvoidance />
                </Canvas> 
                </Card>
            </Col>
            </Row>
        </div>
    )
}