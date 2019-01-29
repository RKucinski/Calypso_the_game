import CustomSprite from '../customSprite';

export default class CollisionableSprite extends CustomSprite {
  constructor(scene, x, y, texture, name, isWalkable) {
    super(scene, x, y, texture);
    this.name = name;
    this.isWalkable = isWalkable;
  }
}
