"use client";

import { Button, Card, Empty, Spin } from "antd";
import { underConstruct } from "../utils/utils";
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { useEffect, useRef, useState } from "react";


export default function Chapter2(){

    const [visor, setVisor] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const canvasRef = useRef<CanvasRenderingContext2D>(null)
    const [datasetImages, setDatasetImages] = useState<any>();
    const [trainImages, setTrainImages] = useState<Float32Array>();
    const [testImages, setTestImages] = useState<Float32Array>();
    const [trainLabels, setTrainLabels] = useState<Uint8Array>();
    const IMAGE_H = 28;
    const IMAGE_W = 28;
    const IMAGE_SIZE = IMAGE_H * IMAGE_W;
    const NUM_CLASSES = 10;
    const NUM_DATASET_ELEMENTS = 65000;
    const NUM_TRAIN_ELEMENTS = 55000;
    const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;
    const MNIST_IMAGES_SPRITE_PATH =
       'https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png';
    const MNIST_LABELS_PATH =
       'https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8';


    useEffect(() => {
        const visor = tfvis.visor();
        visor.el.style.color = 'black';
        setVisor(visor)
      }, [])

      useEffect(() => {
        (async () => {
            setLoading(true)
            const [images, labels] = await Promise.all([
                fetch(MNIST_IMAGES_SPRITE_PATH).then(response => response.arrayBuffer()),
                fetch(MNIST_LABELS_PATH).then(response => response.arrayBuffer())
            ]);
            setDatasetImages(new Uint8Array(images))
            const datasetLabels = new Uint8Array(labels);
            console.log(datasetLabels)
            console.log(datasetImages[12])
            setLoading(false)
        })();
       
    }, []);

    if(loading) return <Spin fullscreen={true} tip="Loading"/>

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Empty image={underConstruct} description="" />
            <div className="flex flex-row">
            </div>
        </div>
    )

}

    
