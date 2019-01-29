// Méthode qui définit la fin du niveau
import { coordToIso, isoToCoord } from './UtilsCoord';
import { OpenDoorTile } from '../gameEngine/objectsCollisionable/index';

export default function spawnTileOpenDoorA(size, game, texture, triggerOpenDoorA, handleClick) {
  // Ajout de la sortie du jeu (triggerTile) avec condition
  const positiontriggerOpenDoorA = coordToIso(4, 5, size.x, size.y);
  /*eslint-disable*/
  const openDoorA = new OpenDoorTile(
    game,
    positiontriggerOpenDoorA.x,
    positiontriggerOpenDoorA.y,
    texture,
    'triggerEndGame',
    false,
  );
  triggerOpenDoorA = game.add.existing(openDoorA);
  const positiontriggerOpenDoorAI = isoToCoord(
    positiontriggerOpenDoorA.x,
    positiontriggerOpenDoorA.y,
    size.x,
    size.y,
  ).i;
  const positiontriggerOpenDoorAJ = isoToCoord(
    positiontriggerOpenDoorA.x,
    positiontriggerOpenDoorA.y,
    size.x,
    size.y,
  ).j;
  triggerOpenDoorA.setDepth(1);
  openDoorA.setInteractive();
  openDoorA.on('pointerdown', handleClick);

  openDoorA.on('pointerover', function() {
    this.setTint(0x86bfda);
  });
  openDoorA.on('pointerout', function() {
    this.clearTint();
  });
  // triggerEndGame.setDepth(10 * postriggerEndGameI + postriggerEndGameJ + 0.4);
  game.triggerOpenDoorA[
    `${positiontriggerOpenDoorAI}-${positiontriggerOpenDoorAJ}`
  ] = triggerOpenDoorA;
  game.playerPrev = { x: game.player.x, y: game.player.y };
}
