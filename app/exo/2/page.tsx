"use client"
import { Button, Tag } from "antd"
import { useRef, useState } from "react"
import * as tf from "@tensorflow/tfjs"

export default function Exo2() {
  const image = useRef<HTMLCanvasElement>(null)
  const [numTensors, setNumTensors] = useState<number>(tf.memory().numTensors)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-100 h-100 m-5">
        <Tag color="orange">
          {" "}
          Nombre de tenseur dans le webGL : {numTensors}
        </Tag>
        <h1 className="font-bold">Exercice 2</h1>
        <p>
          {" "}
          Créer une image 400 sur 400 de nuance de gris à partir d'un tenseur de
          400 sur 400 de valeurs aléatoires, rangez les valeurs par ordre
          croissant
        </p>
        <Button
          onClick={() => {
            tf.tidy(() => {
              setNumTensors(tf.memory().numTensors)
              const tensor: tf.Tensor2D = tf.randomUniform(
                [400, 400],
                0,
                255,
                "int32"
              )
              setNumTensors(tf.memory().numTensors)
              tf.browser.toPixels(tensor, image.current).then(() => {
                tensor.dispose()
                setNumTensors(tf.memory().numTensors)
              })
            })
            setNumTensors(tf.memory().numTensors)
          }}>
          Créer une image
        </Button>
        <canvas
          className="rounded m-5"
          ref={image}
          width={400}
          height={400}></canvas>
      </div>
      <code className="w-100 h-100 m-5">
        <span>
          const tensor: tf.Tensor2D = tf.randomUniform( [400, 400], 0, 255,
          "int32" )
        </span>
        <br />
        <span>
          tf.browser.toPixels(tensor, image.current).then(() ={">"} "{" "}
          <span>tensor.dispose()</span>
          <span>console.log(tf.memory().numTensors)</span> {"}"}
        </span>
      </code>
    </div>
  )
}
