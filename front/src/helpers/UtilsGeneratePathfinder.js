// Création du tableau de pathfinding
import { isoToCoord } from './UtilsCoord';

export function generatePathGrid(map, walkableGrid, game, tilesOutput) {
  for (let y = 0; y < map.length; y += 1) {
    const col = [];
    for (let x = 0; x < map[y].length; x += 1) {
      /*eslint-disable*/
      if (tilesOutput.ground[`${x}-${y}`] && tilesOutput.ground[`${x}-${y}`].isWalkable === true)
        col.push(1);
      else col.push(0);
    }
    walkableGrid.push(col);
  }
}

export function generatePathGridObstacle(walkableGrid, game, tilesOutput) {
  for (let x = 0; x < 1; x += 1) {
    const posDoorI = isoToCoord(tilesOutput.obstacles[x].x, tilesOutput.obstacles[x].y, 35, 35).i;
    const posDoorJ = isoToCoord(tilesOutput.obstacles[x].x, tilesOutput.obstacles[x].y, 35, 35).j;
    if (!tilesOutput.obstacles[x].isWalkable) {
      walkableGrid[posDoorJ][posDoorI] = 0;
    } else {
      walkableGrid[Math.trunc(posDoorJ)][Math.trunc(posDoorI)] = 1;
    }
  }

  game.finder.setGrid(walkableGrid);
  game.finder.setAcceptableTiles([1]);
}
