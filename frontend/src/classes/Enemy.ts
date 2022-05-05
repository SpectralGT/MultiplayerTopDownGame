export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "Enemy");

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}