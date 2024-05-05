"use client";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs-backend-webgl';
import { Alert, Card, Col, Descriptions, message, Row, Spin } from "antd";
import * as handpose from '@tensorflow-models/hand-pose-detection';
import { set } from '@ant-design/plots/es/core/utils';


export default  function Chapter2(){

    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(false);
    let detectInterval: NodeJS.Timer;

   

    async function runHandPoseDetection(detector: handpose.HandDetector){
      if (
        webcamRef.current !== null &&
        webcamRef.current.video?.readyState === 4
      ) {
        const estimationConfig = {flipHorizontal: false};
        const handPose = await detector.estimateHands(webcamRef.current.video, estimationConfig);
            if(handPose.length > 0){
                console.log(handPose);
                await message.success('Hand detected',1000);

            }
        }
      }
    
    

    async function runHandPose() {
        // Load network
        setLoading(true);
        const handPoseConfig = handpose.SupportedModels.MediaPipeHands;
            const handPoseConfigSetup = await handpose.createDetector(handPoseConfig, {
                runtime:'tfjs',
            });
            setLoading(false);
            if(handPoseConfigSetup){
                detectInterval = setInterval(async () => {
                     await runHandPoseDetection(handPoseConfigSetup);
                   },2000 );

                   
            }
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

      
    useEffect(() => {
        tf.setBackend('webgl');
        showMyVideo();
        runHandPose();

        return () => {
            tf.disposeVariables()
        }
    }, []);



    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <Row>
            <Spin spinning={loading} />
            <Card title="Hand Pose Detection"style={{margin: 4}}>
            <p>Actual problem with obtention of backend "wasm"</p><br/>
            <p>The model doesn't give positions of hand, actually can't replicate hands in 3D</p>
            <p>We can actually only notif on hand detection...</p>
            <p> We are on backend "webgl" and we need "wasm" for positions of hand</p>
            <p> you can see all pred return on log in nav inspector</p>
            </Card>
          </Row>
          <Row>
          <canvas ref={canvasRef} className="absolute">
            </canvas>
                <Webcam
                controls={true}
                className="rounded-lg"
                ref={webcamRef}
                audio={false}

                />
          </Row>

        </div>
    )

}

    
