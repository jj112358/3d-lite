import Light from './Light';

class AmbientLight extends Light {
  constructor(color = 0xffffff, intensity = 0.1) {
    super(color, intensity);
    this.type = 'AmbientLight';
    this.isAmbientLight = true;
  }
}

export default AmbientLight;
