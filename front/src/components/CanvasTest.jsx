import React, { Component } from 'react';
/* eslint-disable */
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasInit = React.createRef();
    this.state = {
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 9, 9, 9, 9, 9, 9, 9, 1],
        [1, 9, 1, 1, 9, 1, 1, 9, 1],
        [1, 9, 1, 9, 9, 9, 1, 9, 1],
        [1, 9, 1, 9, 1, 9, 1, 9, 1],
        [1, 9, 1, 1, 1, 1, 1, 9, 1],
        [1, 9, 9, 9, 9, 9, 9, 9, 1],
        [1, 9, 9, 9, 9, 9, 9, 9, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],

      dHauteur: 52,
      dLargeur: 30,
      assetRed: 'http://le-pret-a-surfer.com/sc/map/cad2.png',
      assetWhite: 'http://le-pret-a-surfer.com/sc/map/cad.png',
    };
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    for (let y = 0; y < this.state.map.length; y++) {
      for (let x = 0; x < this.state.map[y].length; x++) {
        const ctx = this.canvasInit.current.getContext('2d');

        const img = new Image();

        img.onload = () => {
          console.log(x, y, this.state.dHauteur, this.state.dLargeur);
          const offset = 30 - 45;
          if (this.state.map[y][x] === 1) {
            ctx.drawImage(
              img,
              (y * 52) / 2 + (x * 52) / 2,
              offset
                + ((x * this.state.dLargeur) / 2 - (y * this.state.dLargeur) / 2)
                + this.state.map[0].length * this.state.dLargeur,
            );
          } else if (this.state.map[y][x] === 9) {
            ctx.drawImage(
              img,
              (y * 52) / 2 + (x * 52) / 2,
              (x * this.state.dLargeur) / 2
                - (y * this.state.dLargeur) / 2
                + this.state.map[0].length * this.state.dLargeur,
            );
          }
        };
        if (this.state.map[y][x] === 1) {
          console.log('1');
          img.src = this.state.assetRed;
        } else {
          console.log('9');
          img.src = this.state.assetWhite;
        }
      }
    }
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasInit} width="500" height="640" />
      </div>
    );
  }
}

export default Canvas;
