import Color from '../utils/Color';

class BasicMaterial {
  constructor(options = {}) {
    const { color = 0xffffff } = options;

    this.type = 'BasicMaterial';

    this.color = new Color(color);

    // 定义顶点和片元着色器源代码
    this.vertexShader = `
      attribute vec3 a_position;
      uniform mat4 u_mvpMatrix;

      void main() {
          gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
      }
    `;

    this.fragmentShader = `
      precision mediump float;
      uniform vec3 u_color;

      void main() {
          gl_FragColor = vec4(u_color, 1.0);
      }
    `;
  }
}

export default BasicMaterial;
