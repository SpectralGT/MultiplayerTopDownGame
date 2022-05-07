export default class LoadingScene extends Phaser.Scene {
	constructor() {
		super("LoadingScene");
	}

	preload() {
		this.load.setPath("src/assets");

		this.load.spritesheet("player", "/PrototypeShooter/SpritesheetGuns.png", {
			frameWidth: 48,
			frameHeight: 16,
		});

		this.load.tilemapTiledJSON('map',"TileMaps/tilemap.json");;

		this.load.image("tiles", "/PrototypeShooter/Tileset.png");
	}
	create() {
		this.scene.start("MainScene");
	}
}
