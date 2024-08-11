import React, { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import * as tfvis from "@tensorflow/tfjs-vis"
import RLAgent from "../utils/agent/cartpole-agent"
import { useFrame } from "@react-three/fiber"
import * as tf from "@tensorflow/tfjs"

const GRAVITY = 9.8
const MASS_CART = 1.0
const MASS_POLE = 0.1
const LENGTH = 0.5 // Half the pole length
const FORCE_MAG = 10.0
const TAU = 0.02 // Time step
const MAX_STEPS = 200 // Max steps per episode

export default function CartPole() {
  const cartRef = useRef<THREE.Mesh>(null!)
  const poleRef = useRef<THREE.Mesh>(null!)

  const [state, setState] = useState({ x: 0, xDot: 0, theta: 0, thetaDot: 0 })
  const [reward, setReward] = useState(0)
  const [episode, setEpisode] = useState(0)
  const [steps, setSteps] = useState(0)
  const [totalReward, setTotalReward] = useState(0)
  const [done, setDone] = useState(false)

  const agent = useRef(new RLAgent())

  const rewardsHistory = useRef<{ reward: number; episode: number }[]>([])

  useEffect(() => {
    if (!done) {
      const interval = setInterval(() => {
        step()
      }, TAU * 1000)
      return () => clearInterval(interval)
    }
  }, [state, done])

  useEffect(() => {
    if (episode % 10 === 0) {
      agent.current.updateTargetModel()
    }
  }, [episode])

  const reset = () => {
    setState({ x: 0, xDot: 0, theta: 0, thetaDot: 0 })
    setReward(0)
    setSteps(0)
    setDone(false)
    agent.current.decayEpsilon()
  }

  useEffect(() => {
    return () => {
      tf.disposeVariables()
    }
  }, [])

  const step = async () => {
    const { x, xDot, theta, thetaDot } = state
    const action = await agent.current.act([x, xDot, theta, thetaDot])

    const force = action === 1 ? FORCE_MAG : -FORCE_MAG
    const costheta = Math.cos(theta)
    const sintheta = Math.sin(theta)

    const temp =
      (force + MASS_POLE * LENGTH * thetaDot * thetaDot * sintheta) /
      (MASS_CART + MASS_POLE)
    const thetaAcc =
      (GRAVITY * sintheta - costheta * temp) /
      (LENGTH *
        (4.0 / 3.0 -
          (MASS_POLE * costheta * costheta) / (MASS_CART + MASS_POLE)))
    const xAcc =
      temp -
      (MASS_POLE * LENGTH * thetaAcc * costheta) / (MASS_CART + MASS_POLE)

    const newX = x + TAU * xDot
    const newTheta = theta + TAU * thetaDot
    const newXDot = xDot + TAU * xAcc
    const newThetaDot = thetaDot + TAU * thetaAcc

    const newState = {
      x: newX,
      xDot: newXDot,
      theta: newTheta,
      thetaDot: newThetaDot,
    }

    // Adjust reward function
    const newReward =
      (Math.abs(newTheta) < Math.PI / 15 ? 1 : -1) - 0.01 * Math.abs(x)

    setState(newState)
    setReward(newReward)
    setSteps(prev => prev + 1)

    await agent.current.train(
      [x, xDot, theta, thetaDot],
      action,
      newReward,
      [newX, newXDot, newTheta, newThetaDot],
      done
    )

    if (Math.abs(newTheta) > Math.PI / 2 || steps >= MAX_STEPS) {
      setDone(true)
      setEpisode(episode + 1)
      setTotalReward(totalReward + newReward)

      rewardsHistory.current.push({
        reward: totalReward + newReward,
        episode: episode + 1,
      })
      const rewardsSurface = tfvis
        .visor()
        .surface({ name: "Rewards", tab: "Training" })
      tfvis.render.linechart(
        rewardsSurface,
        {
          values: rewardsHistory.current.map(d => ({
            x: d.episode,
            y: d.reward,
          })),
          series: ["reward"],
        },
        { xLabel: "Episode", yLabel: "Reward", width: 400, height: 300 }
      )

      reset()
    }
  }

  useFrame(() => {
    if (cartRef.current && poleRef.current) {
      cartRef.current.position.x = state.x
      poleRef.current.rotation.z = state.theta
    }
  })

  return (
    <>
      <mesh ref={cartRef} position={[state.x, 0, 0]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>
      <mesh ref={poleRef} position={[state.x, 0.5, 0]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </>
  )
}
