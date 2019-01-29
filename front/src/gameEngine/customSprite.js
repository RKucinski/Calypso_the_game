import Phaser from 'phaser';

export default class CustomSprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, name, isWalkable) {
    super(scene, x, y, texture);
    this.name = name;
    this.isWalkable = isWalkable;
  }
}
