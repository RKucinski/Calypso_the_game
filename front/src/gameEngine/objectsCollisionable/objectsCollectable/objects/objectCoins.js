import CollectableSprite from '../objectCollectable';

export default class CoinSprite extends CollectableSprite {
  constructor(scene, x, y, texture, name, amount, disable) {
    super(scene, x, y, texture, name);
    this.amount = amount;
    this.disable = disable;
  }

  onPlayerCollision(returnAmount) {
    this.destroy();
    this.disable = false;
    returnAmount(this.amount);
  }
}
