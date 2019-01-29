import {
  Scene,
} from 'phaser';

export default class SceneMenu extends Scene {
  constructor(config) {
    super({
      key: 'scene-menu',
      active: true,
    });
    this.endAction = config.endAction;
    this.map = [];
  }

  create() {
    const saveButton = this.add.text(0, 0, 'Terminer', {
      font: '24px Arial',
      fill: '#995566',
    });
    saveButton.setInteractive();
    saveButton.on('pointerdown', function () {
      this.scene.endAction(this.scene.map);
    }).on('pointerover', function () {
      this.setTint(0xbbbbbb);
    }).on('pointerout', function () {
      this.clearTint();
    });

    this.scene.get('scene-game').events.on('updateMap', (map) => {
      this.map = map;
    });

    this.cameras.main.centerOn(-250, -350);
  }
}
