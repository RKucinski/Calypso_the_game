/* eslint-disable */

import Phaser, {
  Scene,
  
} from 'phaser';
import tile from '../assets/gameAssets/1544021511-tile-sand.png'

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
  }
}

export class SceneGame extends Scene {
  constructor(config) {
    super({
      key: 'scene-game',
      active: true,
    });
    this.config = config;
    this.size = {
      x: 40,
      y: 40
    }
    console.log(this.config)
  }

  preload() {
    this.load.image('bg', '/images/pirate_bg.jpg');
    this.load.image('tile', tile);
    this.load.image('tile2', '/images/1544025120-tile-water.png');
    // this.load.spritesheet('dude', 'https://phaser.io/content/tutorials/making-your-first-phaser-3-game/dude.png', {
    //   frameWidth: 32,
    //   frameHeight: 48,
    // });

    /* this.load.tilemapCSV(
       'map',
       '../assets/catastrophi_level2.csv'); */
    /* this.load.sprite(
      'marioSprite',
      'http://www.raindropslab.com/assets/mario.gif');
    this.load.sprite(
      'dude',
      'https://phaser.io/content/tutorials/making-your-first-phaser-3-game/dude.png'
    ); */
  }

  create() {
    this.isoGroup = this.add.group();

    const {
      map
    } = this.config;
    console.log('map', map)
    let bg = this.add.sprite(0, 0, 'bg');
    bg.setScale(1.2)
    bg.fixedToCamera = true;
    let tile = null;
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const element = map[i][j];
        const {
          x,
          y
        } = this.coordToIso(i, j);
        console.log("xy", x, y)
        tile = this.add.sprite(x, y, 'tile');
        // tile= new Phaser.Geom.Rectangle(x, y, 30, 30);
        // tile.getLocalTransformMatrix( 1,   0.5,
        //   -1,   0.5,
        //  160,   0 )
        tile.setInteractive();
        tile.on('pointerdown', function () {
          console.log(this)
          console.log(this.scene.isoToCoord(this.x,this.y))
          this.setTexture('tile2')
          this.scene.cameras.main.centerOn(this.x,this.y)
        }).on('pointerover', function () {
          this.setTint(0x000000);
          this.isoZ += 0;
        }).on('pointerout', function () {
          this.clearTint();
          this.isoZ -= 0;
        });
      }
    }

    this.cameras.main.centerOn(0, 0);
    this.cameras.main.setBackgroundColor('#ff0000');
    this.cameras.main.zoom = 1
  }

  coordToIso(i, j) {
    const x = (i * this.size.x - j * this.size.y);
    const y = (i * this.size.x + j * this.size.y) / 2;
    return {
      x,
      y
    }
  }

  // i  = (x + j * this.size.y)/this.size.x
  // j = (2*y - i * this.size.x)/this.size.y

  // i = (x + 2*y - i * this.size.x)/this.size.x
  // i = (x + 2*y)/(2*this.size.x)

  // j = (2*y -  x  * this.size.y))/2*this.size.y

  isoToCoord(x, y) {
    const i = (2 * y + x) / (2 * this.size.x);
    const j = (2 * y - x) / (2 * this.size.y);
    return {
      i,
      j
    }
  }

  create2() {
    let level = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0, 0, 0, 1, 2, 3, 0],
      [0, 5, 6, 7, 0, 0, 0, 5, 6, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
      [35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
      [39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39]
    ];
    for (let i = 0; i < 2; i += 1) {
      level = level.map(row => row.concat(row))
    }
    // When loading from an array, make sure to specify the tileWidth and tileHeight
    const map = this.make.tilemap({
      data: level,
      tileWidth: 16,
      tileHeight: 16,
    });
    const tiles = map.addTilesetImage('marioTiles');
    this.groundLayer = map.createStaticLayer(0, tiles, 0, 0);

    this.groundLayer.setCollisionByExclusion([0, 1, 2, 3, 5, 6, 7, 35, 36]);
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(16, 16, 'dude');
    this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('dude', {
        prefix: 'p1_walk',
        start: 5,
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{
        key: 'dude',
        frame: 4,
      }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.groundLayer, this.player);

    // player.anims.play('walk', true);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ff0000');
    this.cameras.main.zoom = 1

    this.events.on('goRight', () => this.goRight())

  }

  goRight = () => {
    this.player.body.setVelocityY(200)
    this.player.anims.play('left', true)
  }


  update2() {
    // this.player.body.setVelocityX(200);
    // this.player.anims.play('right', true); //

    // const pointer = this.input.activePointer;
    // if (pointer.isDown && this.player.body.onFloor()) {
    //     this.events.emit('addScore')
    //     //  var touchX = pointer.x; 
    //     //   var touchY = pointer.y;
    //     this.player.body.setVelocityY(-300);
    // } else {

    //     const cursors = this.input.keyboard.createCursorKeys();
    //     if (cursors.left.isDown) // if the left arrow key is down
    //     {
    //         this.player.body.setVelocityX(-200); // move left
    //         this.player.anims.play('left', true); // play walk animation
    //     }
    //     else if (cursors.right.isDown) // if the right arrow key is down
    //     {
    //         this.player.body.setVelocityX(200);
    //         this.player.anims.play('right', true); // move right
    //     } else if (this.player.body.onFloor()) {
    //         this.player.body.setVelocityX(0); // move left
    //         this.player.anims.play('turn', true); // play wa
    //     }
    //     if ((cursors.space.isDown || cursors.up.isDown) && this.player.body.onFloor()) {
    //         this.player.body.setVelocityY(-300); // jump up
    //     }
    // }

    if (this.player.body.x > this.groundLayer.width * 0.9) {
      this.scene.restart();
    }

  }
}

class SceneUI extends Phaser.Scene {
  constructor() {
    super({
      key: 'sceneUI',
      active: true,
    })
    this.score = 0;
  }

  preload() {
    this.load.spritesheet('dirPad',
      dirPad, {
        frameWidth: 506,
        frameHeight: 506,
      })
  }

  create() {
    this.dirPad = new Phaser.GameObjects.Sprite(this,
      100,
      this.cameras.main.height - 100,
      'dirPad', 0)
    this.dirPad.setScale(0.2, 0.2)
    this.add.existing(this.dirPad)

    this.dirPad.setInteractive()
    this.anims.create({
      key: 'leftBtn',
      frames: [{
        key: 'dirPad',
        frame: 2
      }]
    })
    this.anims.create({
      key: 'rightBtn',
      frames: [{
        key: 'dirPad',
        frame: 1
      }]
    })


    let info = this.add.text(10, 10, this.score.toString(), {
      font: '48px Arial',
      fill: '#000000'
    })

    /* const scene1 = this.scene.get('scene-game')
        scene1.events.on('addScore', () => {
            this.score += 10
            info.setText(this.score.toString())
        }, this)
*/
    // const leftBtn =  new Phaser.Geom.Circle(150,150,50)
    // leftBtn.setInteractive()
    const pointer = this.input.activePointer;

    this.input.on('pointerDown', (event) => {
      console.log('pointer', event)
      this.dirPad.anims.play('rightBtn');

      this.events.emit('goRight');

      // this.score+=1
      // info.setText(this.score)
    })
  }

}
export default class Game extends Phaser.Game {
  constructor(config) {
    super(config)
  }
}