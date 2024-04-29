"use client";

import * as tf from '@tensorflow/tfjs'
import { Button } from 'antd';
import { useState } from 'react'

export default function Chapter1(){

    const [data, setData] = useState<tf.data.CSVDataset>()

    const csvUrl =
    'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv';
    
    async function run() {
      // We want to predict the column "medv", which represents a median value of
   // a home (in $1000s), so we mark it as a label.
   const csvDataset = tf.data.csv(
    csvUrl, {
      columnConfigs: {
        medv: {
          isLabel: true
        }
      }
    });

  // Number of features is the number of column names minus one for the label
  // column.
const numOfFeatures = (await csvDataset.columnNames()).length - 1;

// Prepare the Dataset for training
const flattenedDataset = csvDataset.map(() => {

})
}

return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold">RNN</h1>
        <Button type='primary' onClick={run}>
            Load Data
        </Button>
    </div>
)
}