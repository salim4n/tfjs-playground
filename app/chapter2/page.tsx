"use client";
import { drawRect } from "../utils/utils";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

import {
    load as cocoSSDLoad,
    type ObjectDetection,
  } from '@tensorflow-models/coco-ssd';

import * as tf from '@tensorflow/tfjs';

export default  function Chapter2(){

    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let detectInterval: NodeJS.Timer;

    async function runCoco() {
        // Load network
        const net = await cocoSSDLoad();
    
        //  Loop to detect objects
        detectInterval = setInterval(() => {
          runObjectDetection(net);
        }, 100);
      }

      function showMyVideo() {
        if (
          webcamRef.current !== null &&
          webcamRef.current.video?.readyState === 4
        ) {
          // Get video properties
          const myVideoWidth = webcamRef.current.video.videoWidth;
          const myVideoHeight = webcamRef.current.video.videoHeight;
    
          // Set video width and height
          webcamRef.current.video.width = myVideoWidth;
          webcamRef.current.video.height = myVideoHeight;
        }
      }

      async function runObjectDetection(net: ObjectDetection) {
        if (
          canvasRef.current &&
          webcamRef.current !== null &&
          webcamRef.current.video?.readyState === 4
        ) {
          // Set canvas height and width
          canvasRef.current.width = webcamRef.current.video.videoWidth;
          canvasRef.current.height = webcamRef.current.video.videoHeight;
    
          // Make detections
          const detectedObjects = await net.detect(
            webcamRef.current.video,
            undefined,
            0.5,
          );
    
          console.log('Detect data: ', detectedObjects);
    
          // Draw mesh
          const context = canvasRef.current.getContext('2d');
    
          if (context) {
            // Update drawing utility
            drawRect(detectedObjects, context);
          }
        }
      }

      
    useEffect(() => {
        showMyVideo();
        runCoco();

        return () => {
            tf.disposeVariables()
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
                <canvas ref={canvasRef} className="absolute   ">
                </canvas>
                <Webcam
                className="rounded-lg"
                ref={webcamRef}
                audio={false}
                />
        </div>
    )

}

    
