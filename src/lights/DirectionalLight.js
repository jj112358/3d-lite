import Light from './Light';
import Vector3 from '../utils/Vector3';
import Object3D from '../core/Object3D';

class DirectionalLight extends Light {
  constructor(color = 0xffffff, intensity = 1.0) {
    super(color, intensity);
    this.type = 'DirectionalLight';
    this.isDirectionalLight = true;

    this.position = new Vector3(0, 1, 0);
    this.target = new Object3D();
  }
}

export default DirectionalLight;
