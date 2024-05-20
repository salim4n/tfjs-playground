import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

class RLAgent {
  private model: tf.Sequential;
  private lossValues: { batch: number, loss: number }[] = [];
  private isTraining: boolean = false; // Ajout du drapeau d'état d'entraînement

  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 24, inputShape: [4], activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 24, activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 2, activation: 'linear' }));
    this.model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  }

  async train(state: number[], action: number, reward: number, nextState: number[], done: boolean) {
    if (this.isTraining) return; // Éviter l'entraînement si déjà en cours
    this.isTraining = true; // Marquer l'entraînement comme en cours

    const target = reward + (1 - +done) * 0.95 * (await this.model.predict(tf.tensor2d([nextState])) as tf.Tensor).max().dataSync()[0];
    const targetF = (await this.model.predict(tf.tensor2d([state])) as tf.Tensor).dataSync();
    targetF[action] = target;

    const history = await this.model.fit(tf.tensor2d([state]), tf.tensor2d([targetF as unknown as number[]]));
    this.lossValues.push({ batch: this.lossValues.length, loss: history.history.loss[0] as number });
    tfvis.show.history(tfvis.visor().surface({ name: 'Training Loss', tab: 'Training' }), this.lossValues, ['loss']);

    this.isTraining = false; // Marquer l'entraînement comme terminé
  }

  async act(state: number[]): Promise<number> {
    return (await this.model.predict(tf.tensor2d([state])) as tf.Tensor).argMax(1).dataSync()[0];
  }
}

export default RLAgent;
