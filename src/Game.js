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
import { getRandomNumber } from './utils.js';

var Game = {};

Game.render = null;
Game.scene = null;
Game.projectils = []
Game.chests = []
Game.shields = []
Game.score = 0
Game.state = "running"
Game.chestTaken = 0

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
  DE.Audio.fx.play('boss_music');

  // scene
  Game.scene = new DE.Scene();

  Game.camera = new DE.Camera(0, 0, 1920, 1080, {
    scene: Game.scene,
  });
  Game.camera.interactive = true;
  Game.render.add(Game.camera);

  Game.reset = function() {
    Game.score = 0
    Game.fallingObjectGenerator.reset()
    Game.fallingObjectGenerator.start()
    Game.state = "running"
    Game.hero.x = 0
    Game.hero.y = 0
    Game.chestTaken = 0
    Game.GUI.renderers[1].visible = false
    Game.GUI.renderers[2].visible = false
    Game.restartButton.visible = false
    Game.hero.changeAnimation("idle")
    DE.Audio.fx.play("revive")
  }

  

  Game.map = new DE.GameObject({
    renderers: [
      new DE.SpriteRenderer({spriteName: "map", scale: 4, y: -340})
    ]
  })
  Game.map.border = {x1: -950, x2: 650}

  Game.fallingObjectGenerator = new FallingObjectGenerator({
    spawnLimitX1: Game.map.border.x1 - (1920 / 2),
    spawnLimitX2: Game.map.border.x2 + (1920 / 2),
    delay: 200,
    //y: -1000, force to move this -1000 directly to falling object else it dosnt calcul correctly world pos (getPos)
    zindex: 5,
    fallingObjectsParams: [
      {
        name: "shield",
        proba: 1,
        spriteRendererParams: { 
          spriteName: "shield"  
        }
      },
      {
        name: "chest",
        proba: 1,
        spriteRendererParams: { 
          spriteName: "chest",
          x: 10,
        }
      },
      {
        name: "meteor",
        proba: 28,
        spriteRendererParams: { 
          spriteName: "projectil_1",
          rotation: 1.57,
          x: 5,
        }
      },
    ]
  })
  Game.fallingObjectGenerator.start()

  Game.hero = new DE.GameObject({
    x: 0,
    y: 0,
    scale: 3,
    axes: { x: 0, y: 0 },
    interactive: true,
    checkInputs: function() {
      if (Game.state === "running"){

        if (Game.hero.currentAnim === "idle") {
          switch (Game.hero.inputState) {
            case "rolling_left":
              this.axes.x = -this.speed;
              this.changeAnimation("roll")
              this.renderers[0].setScale(-1, 1)
              this.renderers[0].x = -5
              break
            case "rolling_right":
              this.axes.x = this.speed;
              this.changeAnimation("roll")
              this.renderers[0].setScale(1, 1)
              this.renderers[0].x = 5
              break
            default:
              this.axes.x = 0;
          }
        }
        if ((this.axes.x > 0 && this.x < Game.map.border.x2) || (this.axes.x < 0 && this.x > Game.map.border.x1)) {
          this.translate({ x: this.axes.x * 2, y: this.axes.y * 2 });
        }
  
        

        var v2 = new DE.Vector2(Game.hero.getPos().x, Game.hero.getPos().y, Game.hero)

        Game.fallingObjectGenerator.getFallingObjectsByCategorie('shield').forEach(p => {
          var v1 = new DE.Vector2(p.getPos().x, p.getPos().y, p)
          if (v1.isInRangeFrom(v2, 15)){
            Game.hero.shield = true
            p.removeFromWorld("shields")
            Game.hero.renderers[1].visible = true
          }
        })
        Game.fallingObjectGenerator.getFallingObjectsByCategorie('chest').forEach(p => {
          var v1 = new DE.Vector2(p.getPos().x, p.getPos().y, p)
          if (v1.isInRangeFrom(v2, 50)){
            Game.score += 2000
            DE.trigger( "games-datas", "point_total", 2000 );
            DE.trigger( "games-datas", "point_total_beginer", 1 );
            p.removeFromWorld("chests")
            Game.chestTaken += 1
          }
        })

        DE.trigger( "games-datas", "point_total", 1 );
        DE.trigger( "games-datas", "point_total_beginer", 1 );
        Game.score += 1
        Game.GUI.renderers[0].text = 'Score: ' + Math.round(Game.score).toString() + "pts";
        if (Game.score >= 10000) {
          DE.trigger( "games-datas", "point", 10000 );
          if (Game.chestTaken === 0){
            DE.trigger( "games-datas", "point_no_chest", 10000 );
          }

        }
        Game.fallingObjectGenerator.getFallingObjectsByCategorie('meteor').forEach(p => {
          var v1 = new DE.Vector2(p.getPos().x, p.getPos().y, p)
          if (v1.isInRangeFrom(v2, p.radiusCollision)){
            if (Game.hero.shield === true) {
              Game.hero.shield = false
              Game.hero.renderers[1].visible = false
              p.removeFromWorld("projectils")
            }else {
              Game.state = "gameover"
              Game.restartButton.visible = true
              Game.GUI.renderers[1].visible = true
              Game.GUI.renderers[2].visible = true
              Game.hero.changeAnimation("death")
              DE.Audio.fx.play("death")
              Game.fallingObjectGenerator.stop()
              if ((Game.hightScore || 0) < Game.score) {
                DE.Save.save('score',  Game.score);
                Game.hightScore = Game.score
                Game.GUI.renderers[2].text = 'Hight Score : ' + Math.round(Game.score).toString() + "pts";
              }
            }
          }
        });
      }
    },
    automatisms: [['checkInputs', 'checkInputs']],
  });
  Game.hero.shield = false
  Game.hero.speed = 5 
  Game.hero.currentAnim = "idle"
  Game.hero.inputState = "none"
  
  Game.camera.focus(Game.hero, { options: { rotation: true }, offsets: {x: 0, y: -300} });
  Game.hero.createAnimation = function(firstAnimation) {
    var {currentAnim, nextAnim} = Game.hero.animation[firstAnimation]
    var newAnimation = new DE.SpriteRenderer({ spriteName: currentAnim, x: 5, y: -25})
    if (nextAnim !== "none"){
      newAnimation.onAnimEnd = function() {
        Game.hero.changeAnimation(nextAnim)
      } 
    }else{
      newAnimation.onAnimEnd = function() {}
    }
    return newAnimation; 
  }
  Game.hero.changeAnimation = function(newAnimation) {
    Game.hero.currentAnim = newAnimation
    var {currentAnim, nextAnim, callback} = Game.hero.animation[newAnimation]
    if (callback) {
      callback()
    }
    Game.hero.renderers[0].changeSprite(currentAnim)
    if (nextAnim !== "none"){
      Game.hero.renderers[0].onAnimEnd = function() {
        Game.hero.changeAnimation(nextAnim)
      } 
    }else{
      Game.hero.renderers[0].onAnimEnd = function() {}
    }
  }
  Game.hero.armorSound = ["armor_1", "armor_2", "armor_3", "armor_4"]
  Game.hero.animation = {
    "idle": {
      currentAnim: "hero_idle",
      nextAnim: "idle"
    },
    "roll": {
      currentAnim: "hero_roll",
      nextAnim: "idle",
      callback: function() {
        DE.Audio.fx.play("effort_1")
        DE.Audio.fx.play(Game.hero.armorSound[getRandomNumber(0, Game.hero.armorSound.length - 1)]);
      }
    },
    "death": {
      currentAnim: "hero_death",
      nextAnim: "none"
    },
  },
  Game.hero.addRenderer(Game.hero.createAnimation(Game.hero.currentAnim))
  Game.hero.addRenderer(new DE.SpriteRenderer({
    spriteName: "semi_shield",
    scale: 0.1,
    rotation: 1.57,
    y: -10,
    visible: false
  }))

  Game.GUI = new DE.GameObject({
    zindex: 10,
    renderers: [
      new DE.TextRenderer('score: 0', {
        x: 750,
        y: 450,
        textStyle: {
          fill: 'white',
          fontSize: 50,
          fontFamily: 'Snippet, Monaco, monospace',
          strokeThickness: 1,
          align: 'right',
        },
      }),
      new DE.TextRenderer('GameOver', {
        x: 0,
        y: 0,
        visible: false,
        textStyle: {
          fill: 'white',
          fontSize: 100,
          fontFamily: 'Snippet, Monaco, monospace',
          strokeThickness: 4,
          align: 'right',
        },
      }),
      new DE.TextRenderer('Hight Score : ', {
        x: 0,
        y: 150,
        visible: false,
        textStyle: {
          fill: 'white',
          fontSize: 60,
          fontFamily: 'Snippet, Monaco, monospace',
          strokeThickness: 4,
          align: 'right',
        },
      })
    ],
  })
  Game.hightScore = DE.Save.get('score')
  Game.GUI.renderers[2].text = 'Hight Score : ' + Math.round(Game.hightScore).toString() + "pts";
  Game.restartButton = new DE.GameObject({
    x: -750,
    y: 450,
    visible: false,
    zindex: 50,
    interactive: true,
    hitArea: new DE.PIXI.Rectangle(-225, -50, 450, 100),
    cursor: 'pointer',
    renderers: [
      new DE.RectRenderer(300, 80, '0xffffff', {
        lineStyle: [4, '0x000000', 1],
        fill: true,
        x: -150,
        y: -40,
      }),
      new DE.TextRenderer('restart', {
        textStyle: {
          fill: 'black',
          fontSize: 35,
          fontFamily: 'Snippet, Monaco, monospace',
          strokeThickness: 1,
          align: 'center',
        },
      }),
    ],
    pointerup: function() {
      Game.reset()
    },
  });
  Game.GUI.add(Game.restartButton)
  Game.GUI.focus(Game.hero, { options: { rotation: true }, offsets: {x: 0, y: -300} });

  Game.bg = new Paralax({
    zindex: -1,
    panesParams: [
      {
        speed: 0.05,
        spriteRendererParams: {
          spriteName: "background_0"  
        }
      },
      {
        speed: 0.2,
        spriteRendererParams: {
          spriteName: "background_1"  
        }
      },
      {
        speed: 0.4,
        spriteRendererParams: { 
          spriteName: "background_2"  
        }
      },
    ],
    ref: Game.hero,
  })

  Game.scene.add(
    Game.bg,
    Game.map,
    Game.hero,
    Game.fallingObjectGenerator,
    Game.GUI,
  );

  // input
  DE.Inputs.on('keyDown', 'left', function() {
    Game.hero.inputState = "rolling_left"
  });
  DE.Inputs.on('keyDown', 'right', function() {
    Game.hero.inputState = "rolling_right";
  });
  DE.Inputs.on('keyUp', 'right', function() {
    Game.hero.inputState = "none";
  });
  DE.Inputs.on('keyUp', 'left', function() {
    Game.hero.inputState = "none";
  });
};

// just for helping debugging stuff, never do this ;)
window.Game = Game;

export default Game;
