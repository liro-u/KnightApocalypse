import DE from '@dreamirl/dreamengine';
import { getRandomNumber } from './utils';

class Hero extends DE.GameObject {
    constructor({
        shieldRef = [],
        meteorRef = [],
        startWithShield = false,
        speed = 5,
        isActive = true,
        mapBorder = {x1: 0, x2: 0},        
        ...otherParams
    }) {
        super({
            automatisms: [['checkInputs', 'checkInputs']],
            checkInputs: () => {
                if (this.isActive) {
                    this.ApplyInputs()
                    this.ApplyMovement()
                    this.checkCollision()
                }
            },
            ...otherParams
        });
        // input
        DE.Inputs.on('keyDown', 'left', () => {
            this.inputState = "rolling_left"
        });
        DE.Inputs.on('keyDown', 'right', () => {
            this.inputState = "rolling_right";
        });
        DE.Inputs.on('keyUp', 'right', () => {
            this.inputState = "none";
        });
        DE.Inputs.on('keyUp', 'left', () => {
            this.inputState = "none";
        });
        this.startWithShield = startWithShield
        this.shieldRef = shieldRef
        this.meteorRef = meteorRef
        this.axes = { x: 0, y: 0 },
        this.isActive = isActive
        this.mapBorder = mapBorder
        this.animation = {
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
        }
        this.speed = speed
        this.currentAnim = "idle"
        this.inputState = "none"
        this.armorSound = ["armor_1", "armor_2", "armor_3", "armor_4"]
        this.shieldSprite = new DE.SpriteRenderer({
            spriteName: "semi_shield",
            scale: 0.1,
            rotation: 1.57,
            y: -10,
            visible: false
        })
        this.knightSprite = this.createAnimation(this.currentAnim)
        this.addRenderer(this.knightSprite)
        this.addRenderer(this.shieldSprite)
        this.reset()
    }

    setShield = (value) => {
        this.shield = value
        this.shieldSprite.visible = value
    }

    setIsActive = (value) => {
        this.isActive = value
    }

    getPosAsVector = () => {
        return new DE.Vector2(this.getPos().x, this.getPos().y, this)
    }

    ApplyInputs = () => {
        if (this.currentAnim === "idle") {
            switch (this.inputState) {
            case "rolling_left":
                this.axes.x = -this.speed;
                this.changeAnimation("roll")
                this.knightSprite.setScale(-1, 1)
                this.knightSprite.x = -5
                break
            case "rolling_right":
                this.axes.x = this.speed;
                this.changeAnimation("roll")
                this.knightSprite.setScale(1, 1)
                this.knightSprite.x = 5
                break
            default:
                this.axes.x = 0;
            }
        }
    }

    ApplyMovement = () => {
        if ((this.axes.x > 0 && this.x < this.mapBorder.x2) || (this.axes.x < 0 && this.x > this.mapBorder.x1)) {
            this.translate({ x: this.axes.x * 2, y: this.axes.y * 2 });
        }
    }

    createAnimation = (firstAnimation) => {
        var {currentAnim, nextAnim} = this.animation[firstAnimation]
        var newAnimation = new DE.SpriteRenderer({ spriteName: currentAnim, x: 5, y: -25})
        if (nextAnim !== "none"){
          newAnimation.onAnimEnd = () => {
            this.changeAnimation(nextAnim)
          } 
        }else{
          newAnimation.onAnimEnd = function() {}
        }
        return newAnimation; 
    }

    changeAnimation = (newAnimation) => {
        this.currentAnim = newAnimation
        var {currentAnim, nextAnim, callback} = this.animation[newAnimation]
        if (callback) {
          callback()
        }
        this.knightSprite.changeSprite(currentAnim)
        if (nextAnim !== "none"){
          this.knightSprite.onAnimEnd = () => {
            this.changeAnimation(nextAnim)
          } 
        }else{
          this.knightSprite.onAnimEnd = function() {}
        }
    }

    takeDamage = () => {
        if (this.shield === true) {
            this.setShield(false)
        }else {
            this.changeAnimation("death")
            DE.Audio.fx.play("death")
            this.onDeath()
            this.setIsActive(false)
        }
    }

    checkCollision = () => {
        var heroPosVector = this.getPosAsVector()

        this.shieldRef.forEach(fallingShield => {
          var fallingShieldPosVector = new DE.Vector2(fallingShield.getPos().x, fallingShield.getPos().y, fallingShield)
          if (fallingShieldPosVector.isInRangeFrom(heroPosVector, fallingShield.radiusCollision)){
            this.setShield(true)
            fallingShield.removeFromWorld()
          }
        })

        this.chestRef.forEach(fallingChest => {
            var fallingChestPosVector = new DE.Vector2(fallingChest.getPos().x, fallingChest.getPos().y, fallingChest)
            if (fallingChestPosVector.isInRangeFrom(heroPosVector, fallingChest.radiusCollision)){
              fallingChest.removeFromWorld()
              this.onChestPickup()
            }
        })

        this.meteorRef.forEach(fallingMeteor => {
          var fallingMeteorPosVector = new DE.Vector2(fallingMeteor.getPos().x, fallingMeteor.getPos().y, fallingMeteor)
          if (fallingMeteorPosVector.isInRangeFrom(heroPosVector, fallingMeteor.radiusCollision)){
            this.takeDamage()
            fallingMeteor.removeFromWorld()
          }
        });
    }

    reset = () => {
        this.x = 0
        this.y = 0
        this.changeAnimation("idle")
        this.setIsActive(true)
        this.setShield(this.startWithShield)
    }

    revive = () => {
        DE.Audio.fx.play("revive")
        this.reset()
    }

    onDeath = () => {}
    onChestPickup = () => {}

}
  
export default Hero;
  