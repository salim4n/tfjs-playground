import * as tf from '@tensorflow/tfjs'

export const ACTIONS = ['left', 'right', 'forward', 'backward'];

export const createModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 24, inputShape: [3], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 24, activation: 'relu' }));
    model.add(tf.layers.dense({ units: ACTIONS.length, activation: 'linear' }));
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    return model;
  };

// export const trainModel = async (model, states, actions, rewards, nextStates) => {
//     const currentPredictions = model.predict(tf.tensor2d(states));
//     const nextPredictions = model.predict(tf.tensor2d(nextStates));
//     const updatedPredictions = states.map((state, index) => {
//       const updatedPrediction = currentPredictions[index];
//       updatedPrediction[actions[index]] = rewards[index] + 0.9 * Math.max(...nextPredictions[index]);
//       return updatedPrediction;
//     });

//     await model.fit(tf.tensor2d(states), tf.tensor2d(updatedPredictions), {
//         epochs: 10,
//         shuffle: true,
//       });
// };