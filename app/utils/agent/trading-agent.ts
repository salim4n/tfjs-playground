"use server";

import * as tf from '@tensorflow/tfjs';

tf.setBackend('cpu');

export const ACTIONS = ['buy', 'sell', 'hold'];

export const createModel = () => {
    if(tf.getBackend() === 'webgl') {
        tf.setBackend('cpu');
    }
    console.log(tf.getBackend())
   //TODO: Create a sequential model
  };
  
  export const trainModel = async () => {
    if(tf.getBackend() === 'webgl') {
        tf.setBackend('cpu');
    }
    console.log(tf.getBackend())
    //TODO: Train the model

    //TODO: Normalize the rewards

    //TODO: Create the target values

    //TODO: Log the training data
  };

