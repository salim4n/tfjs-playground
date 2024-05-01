"use client";

import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { Button, Spin, Table } from 'antd';
import { useState } from 'react'
import { generateColumns } from '../utils/utils';

export default function Chapter1(){

    const [data, setData] = useState<tf.TensorContainer[]>()
    const [display, setDisplay] = useState<any>()
    const [columnsName, setColumnsName] = useState<string[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const visor = tfvis.visor();
    visor.el.style.color = 'black';

    const csvUrl =
    'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv';
    
    async function run(){
    setLoading(true)
    const csvDataset = tf.data.csv(csvUrl)
    const names =  await csvDataset.columnNames()
    setColumnsName(names)
    const dataToDispalay = await csvDataset.toArray()
    setData(dataToDispalay)
    const name = 'Data from CSV'
    tfvis.render.linechart({name,tab:"LineChart"}, {values: dataToDispalay.map((d: any) => ({x: d.lstat, y: d.medv}))}, {xLabel: 'LSTAT', yLabel: 'MEDV', height: 300})
    tfvis.render.scatterplot({name, tab:"ScatterPlot"}, {values: dataToDispalay.map((d: any) => ({x: d.lstat, y: d.medv}))}, {xLabel: 'LSTAT', yLabel: 'MEDV', height: 300})
    setLoading(false)
  }

  async function createModel(){
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [12]}));
    model.compile({loss: 'meanSquaredError', optimizer: 'adam'})
    const surfaceModel = {name: 'Model Summary', tab: 'Model'}
    tfvis.show.modelSummary(surfaceModel, model)
    const csvDataset = tf.data.csv(
      csvUrl, {
        columnConfigs: {
          medv: {
            isLabel: true
          },
          zn:{
            required:false
          },
          indus:{
            required:false
          },


        }
      });

      const history = await model.fitDataset(csvDataset, {
        epochs: 4,
        callbacks: {
          onEpochEnd: (epoch, logs) => console.log(logs.loss)
        }
      });
  }


  if(loading) return <Spin fullscreen={true} tip="Loading"/>

return (
    <div className="flex flex-col items-center justify-center h-screen">
      {data ? (
        <>
        <Button type='primary' onClick={() => visor.toggle()} className='m-3'>Toggle Visor</Button>
        <Button type='primary' onClick={createModel} className='m-3'>Create Model</Button>
        <Table dataSource={data} columns={generateColumns(data)} />
        </>
      ):(
        <Button type='primary' onClick={run}>
        Load Boston Housing Dataset
    </Button>
      )}
    </div>
      )
      }
  