"use client"

import { Card, Col, Empty, Row } from "antd";

export default function Chapter6() {

    return (
        <div>
            <Row>
            <Col span={24} className="m-4">
            <Card title="Cartpole Game" >
            <h1>Cartpole Game</h1>
            <p>
                The Cartpole game is a classic reinforcement learning problem. The goal is to balance a pole on a cart that can move left or right. The environment is considered solved when the pole remains upright for 200 time steps.
            </p>
            <p>
                The state of the environment is a 4-dimensional vector representing the position and velocity of the cart and pole. The agent can take one of two actions: push the cart to the left or push the cart to the right.
            </p>
            <p>
                The agent receives a reward of +1 for each time step the pole remains upright. The episode ends when the pole is more than 15 degrees from vertical or the cart moves more than 2.4 units from the center.
            </p>
            <p>
                The Cartpole environment is implemented in the OpenAI Gym library. We will use the TensorFlow.js library to create a neural network model that learns to play the Cartpole game.
            </p>
            </Card>
            </Col>
            </Row>
            <Row>
            <Col span={24} className="m-4">
            <Card title="Cartpole Game" style={{color: "black"}} >
                <Empty description="Under construction" />
            </Card>
            </Col>
            </Row>
        </div>

    )

}