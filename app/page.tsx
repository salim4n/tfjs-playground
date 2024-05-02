"use client";

import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { Button, Spin, Table } from 'antd';
import {  useEffect, useState } from 'react'
import { generateColumns } from './utils/utils';


export default function Home() {

  const [data, setData] = useState<tf.TensorContainer[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [model, setModel] = useState<tf.Sequential | null>(null)
  const [visor, setVisor] = useState<any>()

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
     tf.tidy(() => {
    const dataToDispalay = Array.from({length: 1000}, () => ({
      a: Math.random(),
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random(),
    }))
    setData(dataToDispalay)
    const name = 'Data Generated'
    tfvis.render.table({name,tab:"Info"}, {
      headers: ['a', 'b', 'c', 'd', 'e'],
      values: dataToDispalay.map((d: any) => Object.values(d))
    });

    tfvis.render.histogram({name,tab:"Histogram Label"}, dataToDispalay.map((d: any) => d.e), {height: 300})
    const dataHeatmap = dataToDispalay.map((d: any) => [d.a, d.b, d.c, d.d])as unknown as tfvis.HeatmapData;
    })
    setLoading(false)
  }

  async function createModel(){
    setLoading(true)
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, inputShape: [4], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({loss: 'meanSquaredError', optimizer: 'adam'});
    tfvis.show.modelSummary({name: 'Model Summary', tab: 'Model'}, model);
    tfvis.show.layer({name: 'Input', tab: 'Model'},model);
    setLoading(false)

    const features = data.map((d: any) => [d.a, d.b, d.c, d.d])
    const labels = data.map((d: any) => d.e)
    const xs = tf.tensor2d(features)
    const ys = tf.tensor2d(labels, [labels.length, 1])
    await model.fit(xs, ys, {
      batchSize: 32,
      epochs: 20,
      callbacks: tfvis.show.fitCallbacks(
        { name: 'Training Performance', tab: 'Training'},
        ['loss', 'mse', 'mae', 'mape', 'acc'],
      )
    })
    setModel(model)
  }

  async function predict(){
    tf.tidy(() => {
      const xs = tf.linspace(0, 1, 40).reshape([-1, 4]);
      const preds = model.predict(xs) as tf.Tensor;
      tfvis.render.table({name: 'Predictions', tab: 'Predictions'}, {
        headers: ['X', 'Predicted Y'],
        values: Array.from(xs.dataSync()).map((val, i) => [val, preds.dataSync()[i]])
      });
      })
  }

  if(loading) return <Spin fullscreen={true} tip="Loading"/>

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {data ? (
        <>
        {model ? (
          <Button type='primary' onClick={predict} className='m-3'>Predict</Button>
        ):(
          <>
          <Button type='primary' onClick={createModel} className='m-3'>Create Model</Button>
          </>
        )}
        <Button type='primary' onClick={() => visor.toggle()} className='m-3'>Toggle Visor</Button>
        <Table dataSource={data} columns={generateColumns(data)} />
        </>
      ):(
        <Button type='primary' onClick={run}>
        Load Fake Random Data
      </Button>
      )}
    </div>
      )
}
