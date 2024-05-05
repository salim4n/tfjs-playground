
"use client";

import React from "react";
import { Button, Card, Col, Descriptions, Layout, Row, Spin, message } from "antd";
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { SoundFilled } from "@ant-design/icons";

export default function Chapter3() {
    const [recognizer, setRecognizer] = useState(null);
    const [labels, setLabels] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [recording, setRecording] = useState<boolean>(false);
    const [indexPred, setIndexPred] = useState<number>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    async function loadModel() {
        await tf.setBackend("webgl");
        const recognizer = speechCommands.create("BROWSER_FFT");
        await recognizer.ensureModelLoaded();
        console.log(recognizer.wordLabels());
        return recognizer;
    }

    useEffect(() => {
        if (recognizer) return;
        setLoading(true);
        loadModel().then((res) => {
            setRecognizer(res);
            setLabels(res.wordLabels());
            setLoading(false);
        });
    }, []);

    if (loading) return <Spin fullscreen={true} tip="loading..." />;

    return (
        <>
            <Row>
                <Col span={24} className="m-4">
                    <Card title="Speech Commands">
                        <p>
                            Speech Commands is a dataset of 65,000 one-second long utterances
                            of 20 short words, by thousands of different people. It was
                            collected by Google and released under a CC BY license. It is
                            useful for benchmarking models for speech recognition. The dataset
                            is available for download from the TensorFlow Datasets catalog.
                        </p>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="m-4">
                    <Card>
                        <Button
                            type="primary"
                            ghost
                            className="m-4"
                            onClick={() => {
                                if (recording) {
                                    recognizer.stopListening();
                                    setRecording(false);
                                } else {
                                    recognizer.listen(
                                        async ({scores,spectrogram: {frameSize, data}})  => {
                                            setIndexPred(scores.indexOf(Math.max(...scores)));
                                          
                                        },
                                        {
                                            overlapFactor: 0.999,
                                            includeSpectrogram: true,
                                            invokeCallbackOnNoiseAndUnknown: true,
                                            probabilityThreshold: 0.75,
                                        }
                                    );
                                    setRecording(true);
                                }
                            }}
                        >
                            <SoundFilled />
                            {recording ? "Stop" : "Start"} Recording
                        </Button>
                        <Card>
                            <Descriptions >
                                <Descriptions.Item label="Predicted Word"  contentStyle={{color: "navy", fontSize: 24}}>
                                    {indexPred !== null ? labels[indexPred] : "None"}
                                </Descriptions.Item>
                            </Descriptions>
                            <canvas  ref={canvasRef} style={{width: "100%", height: 200}}></canvas>
                        </Card>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="m-4">
                    <Card title="Labels">
                        <Descriptions>
                            {labels.map((label, i) => (
                                <Descriptions.Item key={i} label={i}>
                                    {label}
                                </Descriptions.Item>
                            ))}
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </>
    );


}