export default class LoadingScene extends Phaser.Scene{
    constructor() {
        super('LoadingScene');
    }

    preload() {
        this.load.setPath("/frames")
        this.load.image('ilde', "._big_demon_anim_f0.png");
    }
    create(){
        this.scene.start("MainScene");
    }
}