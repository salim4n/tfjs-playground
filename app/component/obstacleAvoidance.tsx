import {  Plane, Sphere } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { ACTIONS, createModel } from "../utils/agent/obstacle-agent";
import { useFrame } from "@react-three/fiber";

export default function ObstacleAvoidance() {

const agentRef = useRef();
  const [state, setState] = useState({ x: 0, y: 0, z: 0 });
  const [reward, setReward] = useState(0);
  const [episode, setEpisode] = useState(0);
  const [done, setDone] = useState(false);

  const model = useRef(createModel());

  const reset = () => {
    setState({ x: 0, y: 1, z: 0 });
    setReward(0);
    setDone(false);
  };

//   const step = async () => {
//     const actionIndex = Math.floor(Math.random() * ACTIONS.length); // Random action for simplicity
//     const action = ACTIONS[actionIndex];
//     let newState = { ...state };

//     switch (action) {
//         case 'left':
//           newState.x -= 0.1;
//           break;
//         case 'right':
//           newState.x += 0.1;
//           break;
//         case 'forward':
//           newState.z -= 0.1;
//           break;
//         case 'backward':
//           newState.z += 0.1;
//           break;
//         default:
//           break;
//       }
//        // Simple collision detection
//     if (newState.x < -1 || newState.x > 1 || newState.z < -1 || newState.z > 1) {
//         setReward(reward - 100);
//         setDone(true);
//       } else {
//         setReward(reward + 1);
//         setState(newState);
//       }
  
//       if (done) {
//         setEpisode(episode + 1);
//         reset();
//       }
//       // Update model
//     const currentState = [state.x, state.y, state.z];
//     const nextState = [newState.x, newState.y, newState.z];
//     await trainModel(model.current, [currentState], [actionIndex], [reward], [nextState]);
//   };

useFrame(() => {
    if (agentRef.current) {
        (agentRef.current as any).position.set(state.x, state.y, state.z);
    }
});

// useEffect(() => {
//     if (!done) {
//       const interval = setInterval(() => {
//         step();
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [state, done]);


    return(
        <>
        <pointLight position={[10, 10, 10]} />
        <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <meshStandardMaterial attach="material" color="green" />
        </Plane>
        <Sphere ref={agentRef} position={[state.x, state.y, state.z]}>
            <meshStandardMaterial attach="" color="silver" />
        </Sphere>
        </>
    )
}