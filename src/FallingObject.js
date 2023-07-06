import DE from '@dreamirl/dreamengine';

class FallingObject extends DE.GameObject {
  constructor({
    ref,
    radiusCollision = 50,
    speed = 10,
    lifetime = 2000,
    automatisms = [],
    scale = 3,
    spriteRendererParams,
    ...otherParams
  }) {
    super({
      y: -1000,
      automatisms: [
        ['translateY', 'translateY', { value1: speed }],
        [
          'removeFromWorld',
          'removeFromWorld',
          {
            interval: lifetime,
            persistent: false,
          },
        ],
        ...automatisms,
      ],
      renderers: [new DE.SpriteRenderer({ ...spriteRendererParams })],
      scale,
      ...otherParams,
    });
    this.ref = ref;
    this.speed = speed;
    this.lifetime = lifetime;
    this.radiusCollision = radiusCollision;
  }

  removeFromWorld() {
    if (this.ref) {
      var indexToRemove = this.ref.indexOf(this);
      if (indexToRemove !== -1) {
        this.ref.splice(indexToRemove, 1);
      }
    }
    this.askToKill();
  }
}

export default FallingObject;
