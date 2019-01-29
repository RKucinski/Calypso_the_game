import ObjectObstacle from '../objectObstacle';
import { cartesianToIsometric } from '../../../../helpers/UtilsCoord';

export default class DoorRock extends ObjectObstacle {
  constructor(scene, x, y, texture, name, isWalkable, state) {
    super(scene, x, y, texture, name, isWalkable);
    this.state = state;
  }

  openDoor = (posI, posJ, scene) => {
    const tweens = [];
    const positionDoor = cartesianToIsometric(posI * 35, posJ * 35);
    tweens.push({
      targets: scene.tilesOutput.obstacles[0],
      x: { value: positionDoor.x, duration: 2000 },
      y: { value: positionDoor.y, duration: 2000 },
    });

    scene.tweens.timeline({
      tweens,
    });
  };
}
