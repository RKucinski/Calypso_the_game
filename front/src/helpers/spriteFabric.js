import {
  Player, CoinSprite, EndGameTile, DoorRock,
} from '../gameEngine/objectsCollisionable';
import GroundSprite from '../gameEngine/objectsNotCollisionable';
import CustomSprite from '../gameEngine/customSprite';
import ObjectObstacle from '../gameEngine/objectsCollisionable/objectsObstacle/objectObstacle';

export default function SpriteFabric(game, x, y, json) {
  switch (json.type) {
    case 'CustomSprite':
      return new CustomSprite(game, x, y, json.args.texture, json.args.name, json.args.isWalkable);
    case 'CoinSprite':
      return new CoinSprite(game, x, y, json.args.texture, json.args.name, json.args.isWalkable);
    case 'Player':
      return new Player(game, x, y, json.args.texture, json.args.name, json.args.isWalkable);
    case 'GroundSprite':
      return new GroundSprite(game, x, y, json.args.texture, json.args.name, json.args.isWalkable);
    case 'EndGameTile':
      return new EndGameTile(game, x, y, json.args.texture, json.args.name, json.args.isWalkable);
    case 'ObstacleSprite':
      return new ObjectObstacle(
        game,
        x,
        y,
        json.args.texture,
        json.args.name,
        json.args.isWalkable,
      );
    case 'DoorRock':
      return new DoorRock(
        game,
        x,
        y,
        json.args.texture,
        json.args.name,
        json.args.isWalkable,
        json.args.state,
      );
    default:
      console.log('youpi');
  }
}
