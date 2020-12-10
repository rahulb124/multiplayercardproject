import Phaser from "phaser";
import Game from "./scenes/game";
import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1600,
  height: 840,
  scene: [
      Game
  ]
};

const game = new Phaser.Game(config);
