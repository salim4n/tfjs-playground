"use client"

import * as tf from "@tensorflow/tfjs"
import { Button, Card } from "antd"
import { useEffect, useState } from "react"

export default function Exo1() {
  const [dataAsArray, setDataAsArray] = useState<number[]>([
    832828, 113929349, 12345, 39484848, 12345,
  ])

  useEffect(() => {
    return () => {
      tf.disposeVariables()
      tf.dispose()
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-100 h-100 m-5">
        <h1 className="text-4xl">Exercice 1</h1>
        <p className="text-2xl">
          Tensor de numéro de telephone, retirer les duplicats
        </p>
        <p className="text-lg">{dataAsArray.toString()}</p>
        <Button
          onClick={() => {
            const tensor = tf.tidy(() => {
              const data = tf.tensor1d(dataAsArray)
              const unique = data.unique()
              return unique
            })
            const newArray = Array.from(tensor.values.arraySync())
            setDataAsArray(newArray)
            tf.dispose(tensor)
          }}>
          Supprimer les duplicats
        </Button>
      </div>
      <div className="w-100 h-100 m-5">
        <Card title="Code" className="w-100 bg-slate-600 m-5" bordered={true}>
          <code>const unique = data.unique() </code>
          <br />
          <code>setData(() ={">"} unique.values)</code>
        </Card>
      </div>
    </div>
  )
}
