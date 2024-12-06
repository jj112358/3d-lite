import Object3D from './Object3D';

class Scene extends Object3D {
  constructor() {
    super();
    this.type = 'Scene';
    this.isScene = true;
  }

}

export default Scene;
