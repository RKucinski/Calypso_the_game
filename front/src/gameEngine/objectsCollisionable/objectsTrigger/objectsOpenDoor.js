import Phaser from 'phaser';

export class TriggerTile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, name) {
    super(scene, x, y, texture);
    this.name = name;
    // this.isOpen = false;
    // scene.events.on(eventName, (isOpen) => {
    //   this.isOpen = isOpen;
    // });
  }
}

// Object OpenDoor
export class OpenDoorTile extends TriggerTile {
  constructor(scene, x, y, texture, name, isActived) {
    super(scene, x, y, texture, name);
    this.isActived = isActived;
  }

  // onPlayerCollision = () => {
  //   this.isActivated = !this.isActivated;
  //   this.scene.events.emit(this.eventName, this.isActivated);
  // };
}
