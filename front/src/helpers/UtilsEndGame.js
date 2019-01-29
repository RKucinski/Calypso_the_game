// Méthode qui définit la fin du niveau
import { coordToIso, isoToCoord } from './UtilsCoord';
import { EndGameTile } from '../gameEngine/objectsCollisionable/index';

export function spawnTileEndGame(size, game, texture, triggerEndGame, handleClick) {
  // Ajout de la sortie du jeu (triggerTile) avec condition
  const positionTriggerEndGame = coordToIso(0, 4, size.x, size.y);
  /*eslint-disable*/
  const endGame = new EndGameTile(
    game,
    positionTriggerEndGame.x,
    positionTriggerEndGame.y,
    texture,
    'triggerEndGame',
    false,
  );
  triggerEndGame = game.add.existing(endGame);
  const postriggerEndGameI = isoToCoord(
    positionTriggerEndGame.x,
    positionTriggerEndGame.y,
    size.x,
    size.y,
  ).i;
  const postriggerEndGameJ = isoToCoord(
    positionTriggerEndGame.x,
    positionTriggerEndGame.y,
    size.x,
    size.y,
  ).j;
  triggerEndGame.setDepth(1);
  endGame.setInteractive();
  endGame.on('pointerdown', handleClick);

  endGame.on('pointerover', function() {
    this.setTint(0x86bfda);
  });
  endGame.on('pointerout', function() {
    this.clearTint();
  });
  // triggerEndGame.setDepth(10 * postriggerEndGameI + postriggerEndGameJ + 0.4);
  game.triggersEndGame[`${postriggerEndGameI}-${postriggerEndGameJ}`] = triggerEndGame;
  game.playerPrev = { x: game.player.x, y: game.player.y };
}
/*eslint-enabled*/
export function checkEndGame(counterKey, conditionVictory, game, posPlayerI, posPlayerJ) {
  if (counterKey === conditionVictory) {
    const collidedTriggerEndGame = game.triggersEndGame[`${posPlayerI}-${posPlayerJ}`];
    if (collidedTriggerEndGame) {
      collidedTriggerEndGame.victory();
    }
  }
}
