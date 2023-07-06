import DE from '@dreamirl/dreamengine';
import ParalaxPane from './ParalaxPane';

class Paralax extends DE.GameObject {
  constructor({ ref, panesParams, ...otherParams }) {
    super({
      ...otherParams,
    });
    this.panes = [];
    panesParams.forEach(({ customRef, customZindex, ...paneParams }, index) => {
      var newPane = new ParalaxPane({
        ref: customRef || ref,
        zindex: customZindex || index,
        ...paneParams,
      });
      this.panes.push(newPane);
      this.add(newPane);
    });
  }
}

export default Paralax;
