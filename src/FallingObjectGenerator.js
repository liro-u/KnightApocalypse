import DE from '@dreamirl/dreamengine';
import { getRandomNumber } from './utils';
import FallingObject from './FallingObject';

class FallingObjectGenerator extends DE.GameObject {
  constructor({
    spawnLimitX1,
    spawnLimitX2,
    delay,
    speed,
    lifetime,
    fallingObjectsParams,
    ...otherParams
  }) {
    super({
      ...otherParams,
    });
    this.spawnLimitX1 = spawnLimitX1;
    this.spawnLimitX2 = spawnLimitX2;
    this.delay = delay;
    this.speed = speed;
    this.lifetime = lifetime;
    this.generating = false;

    this.totalProba = 0;
    this.categorie = {};
    this.fallingObjectsParams = fallingObjectsParams;
    fallingObjectsParams.forEach(({ name, proba }) => {
      this.totalProba += proba;
      this.categorie[name] = [];
    });
    this.addAutomatism('createFallingObject', 'createFallingObject', {
      interval: 200,
    });
  }

  createFallingObject() {
    if (this.generating) {
      const randomNumber = getRandomNumber(0, this.totalProba - 1);
      var minProba = 0;
      var index = -1;
      do {
        index += 1;
        minProba += this.fallingObjectsParams[index].proba;
      } while (randomNumber >= minProba);

      const {
        spriteRendererParams,
        name,
        ...fallingObjectParams
      } = this.fallingObjectsParams[index];
      var newFallingObject = new FallingObject({
        x: getRandomNumber(this.spawnLimitX1, this.spawnLimitX2),
        speed: this.speed,
        lifetime: this.lifetime,
        ref: this.categorie[name],
        spriteRendererParams,
        ...fallingObjectParams,
      });
      this.categorie[name].push(newFallingObject);
      this.add(newFallingObject);
    }
  }

  start() {
    this.generating = true;
    this.createFallingObject();
  }

  stop() {
    this.generating = false;
  }

  reset() {
    Object.values(this.categorie).forEach((categorie) => {
      const dup = [...categorie];
      dup.forEach((fallingObject) => {
        fallingObject.removeFromWorld();
      });
    });
  }

  getFallingObjectsByCategorie(categorie) {
    return this.categorie[categorie];
  }
}

export default FallingObjectGenerator;
