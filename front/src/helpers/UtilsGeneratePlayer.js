// Génération du player sur la map
import { coordToIso } from './UtilsCoord';
import { Player } from '../gameEngine/objectsCollisionable/index';

export default function spawnPlayer(positionIsoPlayer, size, game, counterLife, counterGold) {
  /*eslint-disable*/
  positionIsoPlayer = coordToIso(7, 7, size.x, size.y); // position du player
  const playerObject = new Player(
    game,
    positionIsoPlayer.x,
    positionIsoPlayer.y,
    'player2',
    '0018.png',
    counterLife,
    1,
    'SE',
    'Morgan',
    counterGold,
    0,
    0,
  );
  game.player = game.add.existing(playerObject);
  game.player.setScale(0.12, 0.12);
}
