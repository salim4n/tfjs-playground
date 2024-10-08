"use client"

import * as tfvis from "@tensorflow/tfjs-vis"
import * as tf from "@tensorflow/tfjs"
import { Canvas } from "@react-three/fiber"
import { Button, Card, Col, Row, Tag } from "antd"
import { OrbitControls } from "@react-three/drei"
import Cartpole from "../component/cartpole"
import { useEffect, useState } from "react"

/*
  This is a demo of cartpole game in web navigator
  Full bugged that was a first try without reading fully Deep Learning book with tensorflow.js and three.js without knowledge about physics
  bad memory management, bad performance, bad code, bad architecture
  To remake, at the end of the blog, I gonna make a full tutorial Reinforcement Learning with tensorflow.js
  inspired by huggingface RL tutorial but implementeed in tfjs and three.js
*/

export default function Chapter6() {
  const [visor, setVisor] = useState<any>()

  useEffect(() => {
    const visor = tfvis.visor()
    visor.el.style.color = "black"
    setVisor(visor)

    return () => {
      tf.disposeVariables()
    }
  }, [])

  return (
    <div>
      <Row>
        <Col span={24} className="m-4">
          <Card title="Cartpole Game in Web Navigator (WebGL)">
            <Tag color="orange">Tensorflow.js</Tag>
            <Tag color="purple">Three Fiber</Tag>
            <Tag
              style={{ cursor: "pointer" }}
              color="green"
              onClick={() => visor.toggle()}>
              Show Visor
            </Tag>
            <section className="m-4">
              <p>
                The Cartpole game is a classic reinforcement learning problem.
                The goal is to balance a pole on a cart that can move left or
                right. The environment is considered solved when the pole
                remains upright for 200 time steps.
              </p>
              <p>
                The state of the environment is a 4-dimensional vector
                representing the position and velocity of the cart and pole. The
                agent can take one of two actions: push the cart to the left or
                push the cart to the right.
              </p>
              <p>
                The agent receives a reward of +1 for each time step the pole
                remains upright. The episode ends when the pole is more than 15
                degrees from vertical or the cart moves more than 2.4 units from
                the center.
              </p>
              <p>
                The Cartpole environment is implemented in the OpenAI Gym
                library. We will use the TensorFlow.js library to create a
                neural network model that learns to play the Cartpole game.
              </p>
              <Tag color="blue" className="mb-2">
                Wait to 3-5 minutes before model have learning something
              </Tag>
            </section>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="m-4 ">
          <Card
            title="Cartpole Game - You can zoom in, zoom out, move around the space, it's an orbit controls cam, with three js"
            className="bg-gradient-to-r from-red-500 to-blue-500 ">
            <Canvas className="bg-gradient-to-r from-red-500 to-blue-500 rounded-lg">
              <OrbitControls />
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <Cartpole />
            </Canvas>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
