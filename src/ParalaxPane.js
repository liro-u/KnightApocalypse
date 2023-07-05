import DE from '@dreamirl/dreamengine';

class ParalaxPane extends DE.GameObject {
    constructor({speed, automatisms = [], scale = 6, spriteRendererParams, y = -380, ref, ...otherParams}) {
        super({
            y,
            automatisms: [
                ['checkInputs', 'checkInputs'],
                ...automatisms
            ],
            scale,
            renderer: new DE.SpriteRenderer({...spriteRendererParams}),
            checkInputs: function() {
                this.x = ref.x * -this.speed
            },
            ...otherParams
        });
        this.speed = speed;
    }
}
  
export default ParalaxPane;
  