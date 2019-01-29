// Actions lié au objets à re-délocalisé dans les objets

export function checkCoins(gold, coins, posPlayerI, posPlayerJ, game, updateCounterGold, gameData) {
  if (gold.disable === true) {
    const collidedCoin = coins[`${posPlayerI}-${posPlayerJ}`];
    if (collidedCoin) {
      collidedCoin.onPlayerCollision((amount) => {
        /*eslint-disable*/
        game.counterGold += amount;
        gameData.setGold(game.counterGold);
        game.events.emit(updateCounterGold, game.counterGold);
      });
    }
  }
}
export function checkKey(keyDoor, key, posPlayerI, posPlayerJ, game, updateCounterKey, gameData) {
  if (keyDoor.disable === true) {
    const collidedKey = key[`${posPlayerI}-${posPlayerJ}`];
    if (collidedKey) {
      collidedKey.onPlayerCollision(amount => {
        /*eslint-disable*/
        game.counterKey += amount;
        gameData.setKey(game.counterKey);
        game.events.emit(updateCounterKey, game.counterKey);
      });
    }
  }
}
