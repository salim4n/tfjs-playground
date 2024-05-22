"use client"

import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'
import * as tf from '@tensorflow/tfjs'

export function PointsCanvas({ data }:{data: tf.History}) {
    const pointsRef = useRef<THREE.Points>()
    const [points, setPoints] = useState<THREE.Vector3[] | undefined>()

    useEffect(() => {
        pointsRef.current && (pointsRef.current.geometry = new THREE.BufferGeometry());
        setPoints(() => data.history.loss.map((loss, epoch) => new THREE.Vector3(epoch, loss as any, 0)) || []);
    }, [data]);

    
    // Update points on each frame
    useFrame(() => {
        const pointsGeometry = points && new THREE.BufferGeometry().setFromPoints(points);
        pointsRef.current && (pointsRef.current.geometry = pointsGeometry);
    });
  
    return (
      <points ref={pointsRef}>
        <pointsMaterial color="red" />
      </points>
    )
  }