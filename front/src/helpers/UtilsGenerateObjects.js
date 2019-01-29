// Méthodes de génération des objects de la map (Coins, ect...)
import { coordToIso, isoToCoord } from './UtilsCoord';
import { CoinSprite, KeySprite } from '../gameEngine/objectsCollisionable/index';

export function generateCoins(size, game, textureGold, coins) {
  Array(1)
    .fill(0)
    /*eslint-disable*/
    .map(fake => {
      const positionGold = coordToIso(4, 1, size.x, size.y);
      const coin = new CoinSprite(
        game,
        positionGold.x,
        positionGold.y,
        textureGold,
        'coins',
        10,
        true,
      );
      game.gold = game.add.existing(coin);
      game.gold.setDepth(50);
      const posGoldI = isoToCoord(positionGold.x, positionGold.y, size.x, size.y).i;
      const posGoldJ = isoToCoord(positionGold.x, positionGold.y, size.x, size.y).j;
      coins[`${posGoldI}-${posGoldJ}`] = coin;
    });
}

export function generateKey(size, game, textureKey, keys) {
  const positionKey = coordToIso(6, 1, size.x, size.y);
  const key = new KeySprite(game, positionKey.x, positionKey.y, textureKey, 'key', 1, true);
  game.keyDoor = game.add.existing(key);
  game.keyDoor.setDepth(70);
  game.keyDoor.setScale(0.4, 0.4);
  const posKeyI = isoToCoord(positionKey.x, positionKey.y, size.x, size.y).i;
  const posKeyJ = isoToCoord(positionKey.x, positionKey.y, size.x, size.y).j;
  keys[`${posKeyI}-${posKeyJ}`] = key;
}
