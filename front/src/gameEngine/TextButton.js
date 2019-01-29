/* eslint-disable */

// TEST POUR ALLEGER le code  >  à continuer

import Phaser from 'phaser';

export default class TextButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style, callback) {
    super(scene, x, y, text, style);
    this.initialStyle = style;

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.enterButtonHoverState())
      .on('pointerout', () => this.enterButtonRestState())
      .on('pointerdown', () => this.enterButtonActiveState());
  }

  enterButtonHoverState() {
    let font = this.initialStyle.font;
    this.setStyle({ font: `${font}`, fill: '#ff0' });
    console.log(font);
  }

  enterButtonRestState() {
    let style = this.initialStyle;
    this.setStyle({ style });
  }
}
