import Coin from "../classes/Coin";
import Player from "../classes/Player";
import { io, Socket } from "socket.io-client";
import Enemy from "../classes/Enemy";
export default class MainScene extends Phaser.Scene {
	private player!: Player;
	private coin!: Coin;
	private socket!: Socket;
	private self: this;
	private enemies: any;
	constructor() {
		super("MainScene");
		this.self = this;
		this.enemies = {};
	}
	create() {
		this.initSocket();
		this.intiObjects();
		this.initColliders();
	}

	update(time: number, delta: number): void {
		this.player.update(this.socket);
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

	initSocket(): void {
		this.socket = io("http://localhost:8080");

		this.socket.on("players-data", (players) => {
			Object.keys(players).forEach((key) => {
				if (players[key].id != this.socket.id) {
					this.enemies[key] = new Enemy(this, players[key].x, players[key].y);
				}
			});
		});

		this.socket.on("new-player", (playerData) => {
			this.enemies[playerData.id] = new Enemy(this, playerData.x, playerData.y);
		});

		this.socket.on("player-disconnected", (id) => {
			(this.enemies[id] as Enemy).destroy();
			delete this.enemies[id];
		});
	}
}
