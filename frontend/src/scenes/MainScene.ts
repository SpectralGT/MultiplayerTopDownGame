import Player from "../classes/Player";

export default class MainScene extends Phaser.Scene {

	private player!: Player;
	constructor() {
		super("MainScene");
	}
	create() {
		this.player = new Player(this, 0, 0);
	}

	update(time: number, delta: number): void {
		this.player.update();
	}
}
