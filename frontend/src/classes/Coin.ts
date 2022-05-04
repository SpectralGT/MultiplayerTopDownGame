export default class Coin extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "Coin");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true, 0, 0);
        this.setImmovable(true);
    }
}