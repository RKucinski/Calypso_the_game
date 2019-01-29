// Méthodes de projection orthogonale et isométrique
import Phaser from 'phaser';

export function cartesianToIsometric(cartPtX, cartPtY) {
  const tempPt = new Phaser.Geom.Point();
  tempPt.x = cartPtX - cartPtY;
  tempPt.y = (cartPtX + cartPtY) / 2;
  return tempPt;
}

export function isometricToCartesian(isoPt) {
  const tempPt = new Phaser.Geom.Point();
  tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
  tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
  return tempPt;
}

export function getTileCoordinates(cartPt, tileHeight) {
  const tempPt = new Phaser.Geom.Point();
  tempPt.x = Math.floor(cartPt.x / tileHeight);
  tempPt.y = Math.floor(cartPt.y / tileHeight);
  return tempPt;
}

export function getCartesianFromTileCoordinates(tilePt, tileHeight) {
  const tempPt = new Phaser.Geom.Point();
  tempPt.x = tilePt.x * tileHeight;
  tempPt.y = tilePt.y * tileHeight;
  return tempPt;
}

export function coordToIso(i, j, sizeX, sizeY) {
  const tempPt = new Phaser.Geom.Point();
  tempPt.x = i * sizeX - j * sizeY;
  tempPt.y = (i * sizeX + j * sizeY) / 2;
  return tempPt;
}

export function isoToCoord(x, y, sizeX, sizeY) {
  const tempPt = new Phaser.Geom.Point();
  tempPt.i = (2 * y + x) / (2 * sizeX);
  tempPt.j = (2 * y - x) / (2 * sizeY);
  return tempPt;
}
