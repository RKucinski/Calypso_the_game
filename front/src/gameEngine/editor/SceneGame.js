import {
  Scene,
  GameObjects,
} from 'phaser';

const images = [
  '/images/1544025120-tile-water.png',
  '/images/1544021511-tile-sand.png',
  '/images/tile_flag.png',
];

export default class SceneGame extends Scene {
  constructor(config) {
    super({
      key: 'scene-game',
      active: true,
    });
    this.size = {
      x: 40,
      y: 40,
    };
    this.selectedTile = 'tile-0';
    this.map = config.map;
  }

  preload() {
    // this.load.image('bg', '/images/pirate_bg.jpg');
    images.map((image, i) => {
      this.load.image(`tile-${i}`, image);
      return image;
    });
  }

  create() {
    this.isoGroup = this.add.group();

    // const bg = this.add.sprite(0, 0, 'bg');
    // bg.setScale(1.2);
    // bg.fixedToCamera = true;
    for (let i = 0; i < this.map.length; i += 1) {
      for (let j = 0; j < this.map[i].length; j += 1) {
        const {
          x,
          y,
        } = this.coordToIso(i, j);
        if (!this.map[i][j].texture) {
          this.map[i][j] = {
            texture: this.selectedTile,
          };
        }
        const tile = new GameObjects.Sprite(this, x, y, this.map[i][j].texture);
        this.add.existing(tile);
        tile.setInteractive();
        tile.on('pointerdown', function () {
          this.setTexture(this.scene.selectedTile);
          const coord = this.scene.isoToCoord(this.x, this.y);
          this.scene.map[coord.i][coord.j] = {
            texture: this.scene.selectedTile,
          };
          this.scene.events.emit('updateMap', this.scene.map);
        }).on('pointerover', function () {
          this.setTint(0xbbbbbb);
          this.isoZ += 0;
        }).on('pointerout', function () {
          this.clearTint();
          this.isoZ -= 0;
        });
      }
      this.events.emit('updateMap', this.map);
    }

    this.scene.get('scene-assets').events.on('selectTile', (tilename) => {
      this.selectedTile = tilename;
    });

    this.cameras.main.centerOn(0, 0);
    // this.cameras.main.setBackgroundColor('#ff0000');
    this.cameras.main.zoom = 1;
  }

  coordToIso(i, j) {
    const x = (i * this.size.x - j * this.size.y);
    const y = (i * this.size.x + j * this.size.y) / 2;
    return {
      x,
      y,
    };
  }

  isoToCoord(x, y) {
    const i = (2 * y + x) / (2 * this.size.x);
    const j = (2 * y - x) / (2 * this.size.y);
    return {
      i,
      j,
    };
  }
}
