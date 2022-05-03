import Phaser from "phaser";

const gameConfig: Phaser.Types.Core.GameConfig= {
  width: 500,
  height: 800,
  pixelArt:true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 800 },
      debug: true
    }
  },
  scene:[]
};

new Phaser.Game(gameConfig);