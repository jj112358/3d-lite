class NormalMaterial {
  constructor() {
    this.type = 'NormalMaterial';

    this.vertexShader = `
      attribute vec3 a_position;
      attribute vec3 a_normal;
      uniform mat4 u_mvpMatrix;
      varying vec3 v_normal;

      void main() {
        // 传递法线给片元着色器
        v_normal = a_normal;
        
        // 将顶点位置变换到裁剪空间
        gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
      }
    `;

    this.fragmentShader = `
      precision mediump float;
      varying vec3 v_normal;

      void main() {
        // 将法线从 [-1, 1] 映射到 [0, 1] 范围
        vec3 normalColor = normalize(v_normal) * 0.5 + 0.5;
        gl_FragColor = vec4(normalColor, 1.0);
      }
    `;
  }
}

export default NormalMaterial;
