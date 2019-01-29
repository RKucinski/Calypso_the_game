import Phaser from 'phaser';

export class TriggerTile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, name) {
    super(scene, x, y, texture);
    this.name = name;
  }
}

// Object EndGame
export class EndGameTile extends TriggerTile {
  constructor(scene, x, y, texture, name, disable) {
    super(scene, x, y, texture, name);
    this.disable = disable;
  }
  /* eslint-disable */
  victory() {
    this.destroy();
    window.location = '/victory';
  }
}
