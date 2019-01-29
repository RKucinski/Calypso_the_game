import { Scene } from 'phaser';

export default class sceneScore extends Scene {
  constructor(config) {
    super({ key: 'sceneScore', active: true });
    this.config = config;
    this.textGold = null;
    this.textKey = null;
  }

  create() {
    const { counterGold, counterKey } = this.config;
    // création des informations du joueur
    this.textGold = this.add.text(10, 10, '', { font: '20px Courier', fill: '#008080' });
    this.textGold.setText([`Gold : ${counterGold}`]);
    this.textKey = this.add.text(10, 40, '', { font: '20px Courier', fill: '#008080' });
    this.textKey.setText([`Clé : ${counterKey}`]);
    /* eslint-disable */
    this.scene.get('sceneLevel').events.on('updateCounterGold', counterGold => {
      this.textGold.text = [`Gold : ${counterGold}`];
    });
    this.scene.get('sceneLevel').events.on('updateCounterKey', counterKey => {
      this.textKey.text = [`Clé : ${counterKey}`];
    });
  }
}
