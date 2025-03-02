"use client"

import * as tf from "@tensorflow/tfjs"
import * as tfvis from "@tensorflow/tfjs-vis"
import { Button, Card, Spin, Table, Tag } from "antd"
import { useEffect, useState } from "react"
import {
  drawHistogram,
  drawModelSummary,
  drawTable,
  drawScatterPlot,
  drawLine,
  drawBarChartOfEachFeatureOfOneDataset,
  drawHeatMap,
} from "./utils/visor/draw"
import { generateColumns } from "./utils/utils"

type Data = {
  a: number // features
  b: number // features
  c: number // features
  d: number // features
  e: number // labels
}

export default function Home() {
  const [data, setData] = useState<Data[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [model, setModel] = useState<tf.Sequential | null>(null)
  const [visor, setVisor] = useState<any>()

  useEffect(() => {
    const visor = tfvis.visor()
    visor.el.style.color = "black"
    setVisor(visor)

    return () => {
      tf.disposeVariables()
    }
  }, [])

  async function run() {
    setLoading(true)
    const dataToDispalay: Data[] = Array.from({ length: 1000 }, () => ({
      a: Math.random(),
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random(),
    }))
    setData(dataToDispalay)
    const name = "Data Generated"
    drawTable(dataToDispalay, name, "Data Table")
    drawHistogram(dataToDispalay, name, "Data Histogram")
    drawScatterPlot(dataToDispalay, name, "Data Scatter Plot")
    drawLine(dataToDispalay, name, "Data Line Plot")
    drawBarChartOfEachFeatureOfOneDataset(
      dataToDispalay,
      name,
      "Data Bar Chart"
    )
    drawHeatMap(dataToDispalay, name, "Data Heat Map")
    setLoading(false)
  }

  async function createModel() {
    setLoading(true)
      const model = tf.sequential()
      model.add(
        tf.layers.dense({ units: 64, inputShape: [4], activation: "relu" })
      )
      model.add(tf.layers.dense({ units: 1 }))
      model.compile({ loss: "meanSquaredError", optimizer: "adam" })
      drawModelSummary(model, "Model Summary", "Model Summary")

      const features = data.map((d: any) => [d.a, d.b, d.c, d.d])
      const labels = data.map((d: any) => d.e)
      const xs = tf.tensor2d(features)
      const ys = tf.tensor2d(labels, [labels.length, 1])
    await model.fit(xs, ys, {
      batchSize: 32,
      epochs: 20,
      callbacks: tfvis.show.fitCallbacks(
        { name: "Training Performance", tab: "Training" },
        ["loss", "mse", "mae", "mape", "acc"]
      ),
    })
    setModel(model)
    setLoading(false)
    tf.dispose([xs, ys])
  }

  async function predict() {
    tf.tidy(() => {
      const xs = tf.linspace(0, 1, 40).reshape([-1, 4])
      const preds = model.predict(xs) as tf.Tensor
      tfvis.render.table(
        { name: "Predictions", tab: "Predictions" },
        {
          headers: ["X", "Predicted Y"],
          values: Array.from(xs.dataSync()).map((val, i) => [
            val,
            preds.dataSync()[i],
          ]),
        }
      )
    })
  }

  if (loading) return <Spin fullscreen={true} tip="Loading" />

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {data ? (
        <>
          {model ? (
            <Button type="primary" onClick={predict} className="m-3">
              Predict
            </Button>
          ) : (
            <>
              <Button type="primary" onClick={createModel} className="m-3">
                Create Model
              </Button>
            </>
          )}
          <Button type="primary" onClick={() => visor.toggle()} className="m-3">
            Toggle Visor
          </Button>
          <div>
            <Tag color={"orange"}>Tensorflow.js</Tag>
            <Tag color={"purple"}>We gonna use a,b,c,d to predict e</Tag>
          </div>
          <Table dataSource={data} columns={generateColumns(data)} />
        </>
      ) : (
        <Button type="primary" onClick={run}>
          Load Fake Random Data
        </Button>
      )}
    </div>
  )
}
