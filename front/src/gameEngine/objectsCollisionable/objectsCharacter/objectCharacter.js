import { CollisionableSprite } from '..';

export default class Character extends CollisionableSprite {
  constructor(scene, x, y, texture, firstFrame, name, life, speed, direction, dX, dY) {
    super(scene, x, y, texture, firstFrame);
    this.name = name;
    this.life = life;
    this.speed = speed;
    this.direction = direction;
    this.dX = dX;
    this.dY = dY;
  }
}
