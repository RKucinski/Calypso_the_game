import {
  Scene,
  GameObjects,
} from 'phaser';

const images = [
  '/images/1544025120-tile-water.png',
  '/images/1544021511-tile-sand.png',
  '/images/tile_flag.png',
];

export default class SceneAssets extends Scene {
  constructor() {
    super({
      key: 'scene-assets',
      active: true,
    });
    this.tiles = [];
    this.selectedTile = 'tile-0';
  }

  preload() {
    images.map((image, i) => {
      this.load.image(`tile2-${i}`, image);
      return image;
    });
  }

  create() {
    images.map((image, i) => {
      this.tiles[`tile-${i}`] = new GameObjects.Sprite(this, i * 100, 0, `tile-${i}`);
      const tile = this.tiles[`tile-${i}`];
      tile.name = `tile-${i}`;
      this.add.existing(tile);
      this.desactiveTile(tile.name);

      tile.setInteractive();
      tile.on('pointerdown', function () {
        this.scene.desactiveTile(this.scene.selectedTile);
        this.scene.selectedTile = this.name;
        this.scene.activeTile(this.scene.selectedTile);
        this.scene.events.emit('selectTile', this.scene.selectedTile);
      }).on('pointerover', function () {
        this.setTint(0xbbffbb);
      }).on('pointerout', function () {
        this.clearTint();
      });
      return image;
    });
    this.activeTile(this.selectedTile);

    this.cameras.main.centerOn(350, 250);
    this.cameras.main.zoom = 1;
  }

  activeTile = (tilename) => {
    this.tiles[tilename].clearTint();
    this.tiles[tilename].y -= 5;
  }

  desactiveTile = (tilename) => {
    this.tiles[tilename].setTint(0xbbbbbb);
    this.tiles[tilename].y += 5;
  }
}
