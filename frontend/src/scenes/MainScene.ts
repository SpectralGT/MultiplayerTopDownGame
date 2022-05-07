import Coin from "../classes/Coin";
import Player from "../classes/Player";
import { io, Socket } from "socket.io-client";
import Enemy from "../classes/Enemy";
export default class MainScene extends Phaser.Scene {
	private player!: Player;
	private coin!: Coin;
	private socket!: Socket;
	private enemies: any;

	private map!: Phaser.Tilemaps.Tilemap;
	private tileset!: Phaser.Tilemaps.Tileset;
	private wallsLayer!: Phaser.Tilemaps.TilemapLayer;
	private groundLayer!: Phaser.Tilemaps.TilemapLayer;

	constructor() {
		super("MainScene");
		this.enemies = {};
	}
	create() {
		// this.initSocket();
		this.initTileMap();
		this.intiObjects();
		this.initColliders();
	}

	update(time: number, delta: number): void {
		this.player.update(this.socket);
	}

	intiObjects(): void {
		this.player = new Player(this, 400, 400);
		this.coin = new Coin(this, 100, 100);
	}

	initColliders(): void {
		this.physics.add.collider(this.player, this.coin, (obj1, obj2) => {
			(obj1 as Player).setVelocity(0, 0);

			(obj2 as Coin).setPosition(
				Math.random() * this.game.canvas.width,
				Math.random() * this.game.canvas.height
			);

			// this.socket.emit('coin-collected', this.coin.x, this.coin.y);
		});

		this.physics.add.collider(this.player, this.wallsLayer);
	}

	initSocket(): void {
		this.socket = io("http://localhost:8080");

		this.socket.on("enemies-data", (players) => {
			Object.keys(players).forEach((key) => {
				if (players[key].id != this.socket.id) {
					this.enemies[key] = new Enemy(this, players[key].x, players[key].y);
				}
			});
		});

		this.socket.on("new-enemy", (playerData) => {
			this.enemies[playerData.id] = new Enemy(this, playerData.x, playerData.y);
		});

		this.socket.on("enemy-moved", (enemyData) => {
			(this.enemies[enemyData.id] as Enemy).setPosition(
				enemyData.x,
				enemyData.y
			);
		});

		this.socket.on("coin-collected", (newX, newY) => {
			this.coin.setPosition(newX, newY);
		});

		this.socket.on("enemy-disconnected", (id) => {
			(this.enemies[id] as Enemy).destroy();
			delete this.enemies[id];
		});
	}

	initTileMap(): void {
		this.map = this.make.tilemap({
			key: "map",
		});

		this.tileset = this.map.addTilesetImage("Tileset", "tiles");

		this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);

		this.wallsLayer = this.map.createLayer("Walls", this.tileset, 0, 0);
		this.wallsLayer.setCollisionByProperty({ Collidable: true });

		this.wallsLayer.setScale(2);
		this.groundLayer.setScale(2);

		this.physics.world.setBounds(
			0,
			0,
			this.wallsLayer.width,
			this.wallsLayer.height
		);
	}
}
