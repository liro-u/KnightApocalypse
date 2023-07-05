class CustomObject extends DE.GameObject {
    constructor({speed, ...otherParams}) {
        super({...otherParams});
        this.speed = speed;
    }
}
  
export default CustomObject;
  