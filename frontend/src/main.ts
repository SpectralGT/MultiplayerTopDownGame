import Phaser from "phaser";
import LoadingScene from "./scenes/LoadingScene";
import MainScene from "./scenes/MainScene";

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
  scene:[LoadingScene,MainScene]
};

new Phaser.Game(gameConfig);