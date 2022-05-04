export default class Player extends Phaser.Physics.Arcade.Sprite {
	pointerX: number = 0;
	pointerY: number = 0;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, "Player");

		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true, 0.5, 0.5);
	}

	update() {
		if (this.scene.game.input.activePointer.isDown) {
			this.pointerX = this.scene.game.input.activePointer.worldX;
			this.pointerY = this.scene.game.input.activePointer.worldY;

			this.setVelocity(this.pointerX - this.x, this.pointerY - this.y);
		}

		if (
			Math.abs(Math.round(this.pointerX) - Math.round(this.x)) <= 10 &&
			Math.abs(Math.round(this.pointerY) - Math.round(this.y)) <= 10
		) {
			this.setVelocity(0, 0);
			console.log("in position");
		}
	}
}
