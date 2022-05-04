import Coin from "../classes/Coin";
import Player from "../classes/Player";

export default class MainScene extends Phaser.Scene {
	private player!: Player;
	private coin!: Coin;
	constructor() {
		super("MainScene");
	}
	create() {
		this.intiObjects();
		this.initColliders();
	}

	update(time: number, delta: number): void {
		this.player.update();
	}

	intiObjects(): void {
		this.player = new Player(this, 0, 0);
		this.coin = new Coin(this, 100, 100);
	}

	initColliders(): void {
		this.physics.add.collider(this.player, this.coin, (obj1, obj2) => {
			(obj1 as Player).setVelocity(0, 0);
			
			(obj2 as Coin).setPosition(
				Math.random() * this.game.canvas.width,
				Math.random() * this.game.canvas.height
			);
		});
	}
}
