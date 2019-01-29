// Reglage de la camera
/* eslint-disable*/
export default function settingCameras(game) {
  game.cameras.main.startFollow(game.player);
  game.cameras.main.centerOn(0, 0);
  game.cameras.main.zoom = 1;
}
