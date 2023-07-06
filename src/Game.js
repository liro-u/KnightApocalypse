/**
* Author
 @Liro_u / http://dreamirl.com

* ContributorsList
 @Liro_u

***
simple Game declaration
**/
import DE from '@dreamirl/dreamengine';
import Paralax from './Paralax.js';
import FallingObjectGenerator from './FallingObjectGenerator.js';
import GUI from './GUI.js';
import Hero from './Hero.js';
import GameLogic from './GameLogic.js';

var Game = {};

Game.render = null;
Game.scene = null;

// init
Game.init = function() {
  console.log('game init');
  // DE.config.DEBUG = 1;
  // DE.config.DEBUG_LEVEL = 2;

  // Create the renderer before assets start loading
  Game.render = new DE.Render('render', {
    resizeMode: 'stretch-ratio',
    width: 1920,
    height: 1080,
    backgroundColor: '0x00004F',
    roundPixels: false,
    powerPreferences: 'high-performance',
  });
  Game.render.init();

  DE.start();
};

Game.onload = function() {
  console.log('game start');

  // scene
  Game.scene = new DE.Scene();
  DE.Audio.fx.play('boss_music');

  // camera
  Game.camera = new DE.Camera(0, 0, 1920, 1080, {
    scene: Game.scene,
  });
  Game.camera.interactive = true;
  Game.render.add(Game.camera);

  // world aspect
  Game.map = new DE.GameObject({
    renderers: [
      new DE.SpriteRenderer({ spriteName: 'map', scale: 4, y: -340 }),
    ],
    border: { x1: -950, x2: 650 },
  });

  //GUI
  Game.GUI = new GUI({});

  // Game Logic
  Game.Logic = new GameLogic({});
  Game.Logic.onScoreChanged = (value) => {
    Game.GUI.setScore(value);
  };
  Game.Logic.onHightScoreChanged = (value) => {
    Game.GUI.setHightScore(value);
  };
  Game.Logic.refreshHightScore();

  // Falling object
  Game.fallingObjectGenerator = new FallingObjectGenerator({
    spawnLimitX1: Game.map.border.x1 - 1920 / 2,
    spawnLimitX2: Game.map.border.x2 + 1920 / 2,
    delay: 200,
    //y: -1000, //force to move this -1000 directly to falling object else it dosnt calcul correctly world pos (getPos)
    zindex: 5,
    fallingObjectsParams: [
      {
        name: 'shield',
        proba: 1,
        spriteRendererParams: {
          spriteName: 'shield',
        },
      },
      {
        name: 'chest',
        proba: 1,
        spriteRendererParams: {
          spriteName: 'chest',
          x: 10,
        },
      },
      {
        name: 'meteor',
        proba: 28,
        spriteRendererParams: {
          spriteName: 'projectil_1',
          rotation: 1.57,
          x: 5,
        },
      },
    ],
  });

  // Hero
  Game.hero = new Hero({
    scale: 3,
    mapBorder: Game.map.border,
    shieldRef: Game.fallingObjectGenerator.getFallingObjectsByCategorie(
      'shield',
    ),
    meteorRef: Game.fallingObjectGenerator.getFallingObjectsByCategorie(
      'meteor',
    ),
    chestRef: Game.fallingObjectGenerator.getFallingObjectsByCategorie('chest'),
  });
  Game.hero.onDeath = () => {
    Game.GUI.setGameOver(true);
    Game.Logic.isActive = false;
    Game.fallingObjectGenerator.stop();
  };
  Game.hero.onChestPickup = () => {
    Game.Logic.chestPickup += 1;
    Game.Logic.incrementScore(2000);
  };

  // Make camera and GUI follow hero
  Game.camera.focus(Game.hero, {
    options: { rotation: true },
    offsets: { x: 0, y: -300 },
  });
  Game.GUI.focus(Game.hero, {
    options: { rotation: true },
    offsets: { x: 0, y: -300 },
  });

  // Reset a game to default params
  Game.reset = function() {
    Game.Logic.reset();
    Game.fallingObjectGenerator.reset();
    Game.fallingObjectGenerator.start();
    Game.GUI.setGameOver(false);
    Game.hero.reset();
  };
  Game.reset();
  // Restart a game
  Game.restart = () => {
    Game.hero.revive();
    Game.reset();
  };
  // Link button to restart
  Game.GUI.onRestart = Game.restart;

  // Parralax background effect
  Game.bg = new Paralax({
    zindex: -1,
    panesParams: [
      {
        speed: 0.05,
        spriteRendererParams: {
          spriteName: 'background_0',
        },
      },
      {
        speed: 0.2,
        spriteRendererParams: {
          spriteName: 'background_1',
        },
      },
      {
        speed: 0.4,
        spriteRendererParams: {
          spriteName: 'background_2',
        },
      },
    ],
    ref: Game.hero,
  });

  // instance all node
  Game.scene.add(
    Game.bg,
    Game.map,
    Game.hero,
    Game.fallingObjectGenerator,
    Game.GUI,
    Game.Logic,
  );
};

// just for helping debugging stuff, never do this ;)
window.Game = Game;

export default Game;
