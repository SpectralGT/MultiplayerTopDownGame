export default class LoadingScene extends Phaser.Scene{
    constructor() {
        super('LoadingScene');
    }
    create(){
        this.scene.start("MainScene");
    }
}