import Phaser from 'phaser';
import { cartesianToIsometric } from '../../../../helpers/UtilsCoord';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, name, life, speed, direction, pseudo, gold) {
    super(scene, x, y, texture, name, life, speed, direction);
    this.pseudo = pseudo;
    this.gold = gold;
    this.currentOrientation = direction;
  }

  updatePlayerOrientation = (game) => {
    /*eslint-disable*/
    const vect = new Phaser.Math.Vector2(this.x - game.playerPrev.x, this.y - game.playerPrev.y);
    if (vect.angle() > 0 && vect.angle() < Math.PI / 2) game.playerOrientation = 'SE';
    else if (vect.angle() > Math.PI / 2 && vect.angle() < Math.PI) game.playerOrientation = 'SO';
    else if (vect.angle() > Math.PI && vect.angle() < (3 * Math.PI) / 2) game.playerOrientation = 'NO';
    else if (vect.angle() > 3* Math.PI /2 && vect.angle() < 2 * Math.PI) game.playerOrientation = 'NE';
    game.playerPrev = { x: this.x, y: this.y };

    if (vect.angle() === 0) {
      game.player.anims.play(`idle${this.currentOrientation}`, true);
    }
    if (game.playerOrientation === 'NO' && vect.angle() !== 0) {
      game.player.anims.play('NO', true);
    }
    if (game.playerOrientation === 'NE' && vect.angle() !== 0) {
      game.player.anims.play('NE', true);
    }
    if (game.playerOrientation === 'SE' && vect.angle() !== 0) {
      game.player.anims.play('SE', true);
    }
    if (game.playerOrientation === 'SO' && vect.angle() !== 0) {
      game.player.anims.play('SO', true);
    }
    this.currentOrientation = game.playerOrientation;
  };

  moveCharacter(path, size, scene) {
    let tweens = [];
    for (let i = 0; i < path.length - 1; i++) {
      let ex = path[i + 1].x;
      let ey = path[i + 1].y;
      let positionFromX = ex * size.x;
      let positionFromY = ey * size.y;
      let isoPt = cartesianToIsometric(positionFromX, positionFromY);

      tweens.push({
        targets: scene.player,
        x: { value: isoPt.x, duration: 300 },
        y: { value: isoPt.y, duration: 300 },
      });
    }
    scene.tweens.timeline({
      tweens: tweens,
    });
  }

  createAnimsPlayers(game) {
    const frameAnimationNordOuest = game.anims.generateFrameNames('player2', {
      start: 0,
      end: 8,
      zeroPad: 4,
      suffix: '.png',
    });
    const frameAnimationNordEst = game.anims.generateFrameNames('player2', {
      start: 9,
      end: 17,
      zeroPad: 4,
      suffix: '.png',
    });
    const frameAnimationSudEst = game.anims.generateFrameNames('player2', {
      start: 18,
      end: 26,
      zeroPad: 4,
      suffix: '.png',
    });
    const frameAnimationSudOuest = game.anims.generateFrameNames('player2', {
      start: 27,
      end: 35,
      zeroPad: 4,
      suffix: '.png',
    });
    const idleNO = game.anims.generateFrameNames('idlePlayer', {
      start: 0,
      end: 0,
      zeroPad: 4,
      suffix: '.png',
    });
    const idleNE = game.anims.generateFrameNames('idlePlayer', {
      start: 1,
      end: 1,
      zeroPad: 4,
      suffix: '.png',
    });
    const idleSO = game.anims.generateFrameNames('idlePlayer', {
      start: 2,
      end: 2,
      zeroPad: 4,
      suffix: '.png',
    });
    const idleSE = game.anims.generateFrameNames('idlePlayer', {
      start: 3,
      end: 3,
      zeroPad: 4,
      suffix: '.png',
    });

    game.anims.create({ key: 'NO', frames: frameAnimationNordOuest, frameRate: 10, repeat: -1 });
    game.anims.create({ key: 'NE', frames: frameAnimationNordEst, frameRate: 10, repeat: -1 });
    game.anims.create({ key: 'SE', frames: frameAnimationSudEst, frameRate: 10, repeat: -1 });
    game.anims.create({ key: 'SO', frames: frameAnimationSudOuest, frameRate: 10, repeat: -1 });
    game.anims.create({ key: 'idleNO', frames: idleNO, frameRate: 10, repeat: -1 });
    game.anims.create({ key: 'idleNE', frames: idleNE, frameRate: 10, repeat: -1 });
    game.anims.create({ key: 'idleSO', frames: idleSO, frameRate: 10, repeat: -1 });
    game.anims.create({ key: 'idleSE', frames: idleSE, frameRate: 10, repeat: -1 });
  }
}
