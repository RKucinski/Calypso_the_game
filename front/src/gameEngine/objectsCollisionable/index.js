// Objects-Collisionable
import CollisionableSprite from './objectCollisionable';
// Character
import Character from './objectsCharacter/objectCharacter';
import Player from './objectsCharacter/objects/player';
// Collectable
import CollectableSprite from './objectsCollectable/objectCollectable';
import CoinSprite from './objectsCollectable/objects/objectCoins';
import KeySprite from './objectsCollectable/objects/objectKey';
// Obstacle
import ObjectObstacle from './objectsObstacle/objectObstacle';
import DoorRock from './objectsObstacle/objects/doorRock';
// Trigger
import { TriggerTile, EndGameTile } from './objectsTrigger/objectsEndGame';
import { OpenDoorTile } from './objectsTrigger/objectsOpenDoor';

export {
  CollisionableSprite,
  Character,
  Player,
  CollectableSprite,
  CoinSprite,
  ObjectObstacle,
  TriggerTile,
  EndGameTile,
  KeySprite,
  DoorRock,
  OpenDoorTile,
};
