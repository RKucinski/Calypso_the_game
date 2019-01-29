// Méthodes de génération de la map du level
import { coordToIso, isoToCoord } from './UtilsCoord';
import SpriteFabric from './spriteFabric';

export default function spawnMap(game, map, tilesOutput, size, handleClick) {
  // Generation du ground
  /* eslint-disable */
  for (let xx = 0; xx < map.layerGround.length; xx += 1) {
    for (let yy = 0; yy < map.layerGround[xx].length; yy += 1) {
      tilesOutput.ground[xx + '-' + yy] = new SpriteFabric(
        game,
        coordToIso(xx, yy, size.x, size.y).x,
        coordToIso(xx, yy, size.x, size.y).y,
        map.layerGround[xx][yy],
      );
      game.add.existing(tilesOutput.ground[xx + '-' + yy]);
      // Réglage Z-Index des tiles 'notWalkable'
      if (tilesOutput.ground[xx + '-' + yy].isWalkable === false)
        tilesOutput.ground[xx + '-' + yy].setDepth(10 * xx + yy);
      if (tilesOutput.ground[xx + '-' + yy].isWalkable === true) {
        tilesOutput.ground[xx + '-' + yy].setInteractive();
        tilesOutput.ground[xx + '-' + yy].on('pointerdown', handleClick);

        tilesOutput.ground[xx + '-' + yy].on('pointerover', function() {
          this.setTint(0x86bfda);
        });
        tilesOutput.ground[xx + '-' + yy].on('pointerout', function() {
          this.clearTint();
        });
      }
    }
  }
  // Generation obstacle

  for (let x = 0; x < map.layerObstacle.length; x += 1) {
    tilesOutput.obstacles[x] = new SpriteFabric(
      game,
      map.layerObstacle[x].args.x,
      map.layerObstacle[x].args.y,
      map.layerObstacle[x],
    );
    game.add.existing(tilesOutput.obstacles[x]);
    const posDoorI = isoToCoord(map.layerObstacle[x].args.x, map.layerObstacle[x].args.y, 35, 35).i;
    const posDoorJ = isoToCoord(map.layerObstacle[x].args.x, map.layerObstacle[x].args.y, 35, 35).j;
    tilesOutput.obstacles[x].setDepth(10 * posDoorI + posDoorJ);
  }
}
