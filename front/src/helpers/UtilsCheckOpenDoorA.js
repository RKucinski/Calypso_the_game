export default function checkOpenDoorA(game, posPlayerI, posPlayerJ, size) {
  const collidedTriggerOpenDoorA = game.triggerOpenDoorA[`${posPlayerI}-${posPlayerJ}`];
  if (collidedTriggerOpenDoorA) {
    /*eslint-disable*/
    game.tilesOutput.obstacles[0].isWalkable = true;
    game.tilesOutput.obstacles[0].openDoor(3, 5, game, size);
  }
}
