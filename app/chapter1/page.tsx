"use client";

import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { Button, Empty, Popover, Spin, Table } from 'antd';
import {  useEffect, useState } from 'react'
import { generateColumns, normalizeData, underConstruct } from '../utils/utils';
import { drawBarChartOfEachFeatureOfOneDataset, drawHeatMap, drawHistogram, drawLine, drawScatterPlot, drawTable } from '../utils/visor/draw';

export default function Chapter1(){

    const [data, setData] = useState<tf.TensorContainer[]>()
    const [visor, setVisor] = useState<any>()
    const [columnsName, setColumnsName] = useState<string[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const csvUrl =
    'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv';

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
    const csvDataset = tf.data.csv(csvUrl)
    const names =  await csvDataset.columnNames()
    setColumnsName(names)
    const dataToDispalay = await csvDataset.toArray()
    setData(dataToDispalay)

    const name = 'Boston Housing Dataset'
    //normalize data
    const dataNormalized = await normalizeData(dataToDispalay);
    drawTable(dataNormalized as any, name, 'Data  Normalized')
    drawHistogram(dataToDispalay , name, 'Data Histogram')
    drawScatterPlot(dataToDispalay, name, 'Data Scatter Plot')
    drawLine(dataToDispalay , name, 'Data Line Plot')
    drawBarChartOfEachFeatureOfOneDataset(dataToDispalay, name, 'Data Bar Chart')
    drawHeatMap(dataToDispalay , name, 'Data Heat Map')
    setLoading(false)
  }


if(loading) return <Spin fullscreen={true} tip="Loading"/>

return (
    <div className="flex flex-col items-center justify-center h-screen">
      {data ? (
        <>
        <Button type='primary' onClick={() => visor.toggle()} className='m-3'>Toggle Visor</Button>
        <Popover content="Model not defined actually...">
        <Button type='primary' disabled className='m-3'>Create Model</Button>
        </Popover>
        <Table dataSource={data} columns={generateColumns(data)} />
        </>
      ):(
        <><Empty image={underConstruct} description="" />
        <Button type='primary' onClick={run}>
          Load Boston Housing Dataset
        </Button></>
      )}
    </div>
      )
      }
  