/* eslint-disable */
import Phaser, { Scene } from 'phaser';
import Easystar from 'easystarjs';
import {
  spawnMap,
  settingCameras,
  spawnPlayer,
  generateCoins,
  generatePathGrid,
  spawnTileEndGame,
  checkEndGame,
  checkCoins,
  isoToCoord,
  generateKey,
  checkKey,
  spawnTileOpenDoorA,
  checkOpenDoorA,
  generatePathGridObstacle,
} from '../../helpers';

export default class sceneLevel extends Scene {
  constructor(config) {
    super({ key: 'sceneLevel', active: true });
    this.config = config;
    this.walkableGrid = [];
    this.player;
    this.positionIsoPlayer;
    this.playerPrev;
    this.finder = new Easystar.js();
    this.size = { x: 35, y: 35 };
    this.key = {};
    this.keyDoor;
    this.coins = {};
    this.tilesOutput = {
      ground: {},
      obstacles: {},
    };
    this.triggersEndGame = {};
    this.triggerOpenDoorA = {};
    this.endGame;
    this.gold;
    this.counterGold = 0;
    this.counterKey = 0;
    this.conditionVictory = 1;
    this.posPlayerI;
    this.posPlayerJ;
    //Orientation du player
    this.timeX = 0;
    this.timeY = 0;
    this.destination = new Phaser.Geom.Point(0, 0);
    this.isWalking = false;
    this.gameData = this.config.gameData;
  }

  preload() {
    // Player
    this.load.multiatlas('player2', '/assets/player.json', '/assets');
    this.load.multiatlas('idlePlayer', '/assets/idle.json', '/assets');
    // Assets
    this.load.image('sea', '/images/tile_sea.png');
    this.load.image('sable', '/images/tile_sable.png');
    this.load.image('wall', '/images/tile_wall.png');
    this.load.image('wallLeft', '/images/tile_wallLeft.png');
    this.load.image('wallRight', '/images/tile_wallRight.png');
    this.load.image('woodTile', '/images/tile_woodGround.png');
    this.load.image('rock', '/images/tile_rock.png');
    // Items Collectable
    this.load.image('gold', '/images/gold_10.png');
    this.load.image('key', '/images/key.png');
    // Items null
    this.load.image('null', '/images/null.png');
  }

  create() {
    spawnMap(this, this.config.map, this.tilesOutput, this.size, this.handleClick);
    spawnPlayer(this.positionIsoPlayer, this.size, this, this.counterLife, this.counterGold);
    this.player.createAnimsPlayers(this);
    generatePathGrid(this.config.map.layerGround, this.walkableGrid, this, this.tilesOutput);
    settingCameras(this);
    generateCoins(this.size, this, 'gold', this.coins);
    generateKey(this.size, this, 'key', this.key);
    spawnTileEndGame(this.size, this, 'woodTile', this.triggerEndGame, this.handleClick);
    spawnTileOpenDoorA(this.size, this, 'woodTile', this.triggerOpenDoorA, this.handleClick);
  }

  update() {
    // Pos I / J du Player
    this.posPlayerI = isoToCoord(this.player.x, this.player.y, this.size.x, this.size.y).i;
    this.posPlayerJ = isoToCoord(this.player.x, this.player.y, this.size.x, this.size.y).j;
    // Update Z- Index Player
    this.player.setDepth(10 * this.posPlayerI + this.posPlayerJ + 0.5);
    // this.player.setDepth(1);
    this.player.updatePlayerOrientation(this);
    checkCoins(
      this.gold,
      this.coins,
      this.posPlayerI,
      this.posPlayerJ,
      this,
      'updateCounterGold',
      this.gameData,
    );
    checkKey(
      this.keyDoor,
      this.key,
      this.posPlayerI,
      this.posPlayerJ,
      this,
      'updateCounterKey',
      this.gameData,
    );
    checkEndGame(this.counterKey, this.conditionVictory, this, this.posPlayerI, this.posPlayerJ);
    checkOpenDoorA(this, this.posPlayerI, this.posPlayerJ, this.doorRock, this.size);
  }

  handleClick() {
    generatePathGridObstacle(this.scene.walkableGrid, this.scene, this.scene.tilesOutput);
    let toX = Math.trunc(isoToCoord(this.x, this.y, this.scene.size.x, this.scene.size.y).i);
    let toY = Math.trunc(isoToCoord(this.x, this.y, this.scene.size.x, this.scene.size.y).j);
    let fromX = Math.trunc(
      isoToCoord(this.scene.player.x, this.scene.player.y, this.scene.size.x, this.scene.size.y).i,
    );
    let fromY = Math.trunc(
      isoToCoord(this.scene.player.x, this.scene.player.y, this.scene.size.x, this.scene.size.y).j,
    );
    this.scene.finder.findPath(fromX, fromY, toX, toY, path => {
      if (path === null) {
        console.warn('Path was not found.');
      } else {
        this.scene.player.moveCharacter(path, this.scene.size, this.scene);
      }
    });
    this.scene.finder.calculate();
  }
}
