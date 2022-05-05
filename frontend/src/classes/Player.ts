import { Socket } from "socket.io-client";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	pointerX: number = 0;
	pointerY: number = 0;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, "Player");

		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setImmovable(true);
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
			socket.emit('player-moved', this.x, this.y);
		}

		if (
			this.body.position.fuzzyEquals(
				new Phaser.Math.Vector2(this.pointerX, this.pointerY),
				15
			)
		) {
			this.setVelocity(0, 0);
		}
	}
}
