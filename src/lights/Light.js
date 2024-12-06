import Object3D from '../core/Object3D';

import Color from '../utils/Color';

class Light extends Object3D {
  constructor(color, intensity) {
    super();
    this.isLight = true;
    this.type = 'Light';

    this.color = new Color(color);
    this.intensity = intensity;
  }
}

export default Light;
