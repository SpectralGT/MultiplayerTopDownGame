import { Socket } from "socket.io-client";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	pointerX: number = 0;
	pointerY: number = 0;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, "Player");

		//adds this player instance to the scene
		scene.add.existing(this);
		scene.physics.add.existing(this);

		//makes the player immovable by other objects
		this.setImmovable(true);

		//adds collision between player and worldbound/screen border
		this.setCollideWorldBounds(true, 0.5, 0.5);
	}

	update(socket: Socket) {
		if (this.scene.game.input.activePointer.isDown) {
			this.pointerX = this.scene.game.input.activePointer.worldX;
			this.pointerY = this.scene.game.input.activePointer.worldY;

			var moveVel = new Phaser.Math.Vector2(
				this.pointerX - this.x,
				this.pointerY - this.y
			);

			moveVel.normalize();
			moveVel.multiply(new Phaser.Math.Vector2(100, 100));
			this.setVelocity(moveVel.x, moveVel.y);
		}

		if (
			this.body.position.fuzzyEquals(
				new Phaser.Math.Vector2(this.pointerX, this.pointerY),
				10
			)
		) {
			this.setVelocity(0, 0);
		} else {
			socket.emit("player-moved", this.x, this.y);
		}
	}
}
