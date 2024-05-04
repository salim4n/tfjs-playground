"use client";

import { Card, Empty, Layout } from "antd";
import { generateColumns } from "../utils/utils";
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { Button, Spin, Table } from 'antd';
import { useEffect, useState } from "react";
import { drawBarChartOfEachFeatureOfOneDataset, drawHeatMap, drawHistogram, drawLine, drawModelSummary, drawScatterPlot } from "../utils/visor/draw";

export default function Chapter4(){
    const REMOTE_JENA_WEATHER_CSV_PATH =
    'https://storage.googleapis.com/learnjs-data/jena_climate/jena_climate_2009_2016.csv';

    const [loading, setLoading] = useState<boolean>(false)
    const [model, setModel] = useState<tf.Sequential | null>(null)
    const [visor, setVisor] = useState<any>()
    const [data, setData] = useState<tf.TensorContainer[]>()

    useEffect(() => {
        const visor = tfvis.visor();
        visor.el.style.color = 'black';
        setVisor(visor)
        return () => {
          tf.disposeVariables()
      }
      }, [])


    async function run(){
        setLoading(true)
        const dataFetched =  await tf.data.csv(REMOTE_JENA_WEATHER_CSV_PATH)
        .toArray()

        const name = "Jena Climate Data"
        const slicedData = dataFetched.slice(0, 1000)
        setData(slicedData)
        drawHistogram(dataFetched, name, 'Data Histogram')
        drawScatterPlot(dataFetched, name, 'Data Scatter Plot')
        drawLine(dataFetched, name, 'Data Line Plot')
        drawBarChartOfEachFeatureOfOneDataset(dataFetched, name, 'Data Bar Chart')
        drawHeatMap(dataFetched, name, 'Data Heat Map')
        setLoading(false)
        
        const features = dataFetched.map((d: any) => [d.a, d.b, d.c, d.d])
        const labels = dataFetched.map((d: any) => d.e)

        const xs = tf.tensor2d(features)
        const ys = tf.tensor2d(labels, [labels.length, 1]);

        const lr = 0.1;
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 64, inputShape: [4], activation: 'relu'}));
        model.add(tf.layers.dense({units: 64, activation: 'relu'}));
        model.add(tf.layers.dense({units: 1}));
        model.compile({optimizer: tf.train.adam(lr), loss: 'meanSquaredError', metrics: ['mse']});
        setModel(model)
        drawModelSummary(model, 'Model Summary', 'Model Summary')
        const history = await model.fit(xs,ys,{
            batchSize: 32,
            epochs: 100,
            callbacks: tfvis.show.fitCallbacks(
              { name: 'Training Performance', tab: 'Training'},
                ['loss', 'mse'],
              { height: 200, callbacks: ['onEpochEnd'] }
            )
          });
    }

    if(loading) return <Spin fullscreen={true} tip="it can take few minutes ..." />

    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <Button type='primary' onClick={() => visor.toggle()} className='m-3'>Toggle Visor</Button>
        <Button type='primary' onClick={run}>
        Load Meteo Data
      </Button>
      <Layout className="w-full h-full">
        <Card  className="m-3">
          {data ? (
            <Table columns={generateColumns(data)} dataSource={data} />
          ) : (
            <Empty />
          )}
        </Card>
      </Layout>
    </div>
    )
}