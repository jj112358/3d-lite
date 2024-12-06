import Light from './Light';
import Vector3 from '../utils/Vector3';

class PointLight extends Light {
  constructor(color = 0xffffff, intensity = 1.0) {
    super(color, intensity);
    this.type = 'PointLight';
    this.isPointLight = true;

    this.position = new Vector3(0, 1, 0);  // 光源的位置
  }
}

export default PointLight;
