import { Socket } from "socket.io-client";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	pointerX: number = 0;
	pointerY: number = 0;

	speed = 100;

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
		//check if the pointer/cursor is clicked
		if (this.scene.game.input.activePointer.isDown) {
			//sets the pointer position to activePointer world position
			this.pointerX = this.scene.game.input.activePointer.worldX;
			this.pointerY = this.scene.game.input.activePointer.worldY;

			//gets the direction to more towards
			var moveDir = new Phaser.Math.Vector2(
				this.pointerX - this.x,
				this.pointerY - this.y
			);

			moveDir.normalize();

			//sets the player velocity according to direction and speed
			this.setVelocity(moveDir.x * this.speed, moveDir.y * this.speed);
		}

		//smoothly rotated the player to look at pointer
		this.rotation = Phaser.Math.Angle.RotateTo(
			this.rotation,
			Phaser.Math.Angle.Between(this.x, this.y, this.pointerX, this.pointerY),
			0.1
		);

		//check if the player reached the destination
		if (
			this.body.position.fuzzyEquals(
				new Phaser.Math.Vector2(this.pointerX, this.pointerY),
				15
			)
		) {
			//stop the player from moving forward then destination
			this.setVelocity(0, 0);
		} else {
			//transmit the new position to server
			// socket.emit("player-moved", this.x, this.y);
		}
	}
}
