import Color from '../utils/Color';

class PhongMaterial {
  constructor(options = {}) {
    const { color = 0xffffff, specular = 0x111111, shininess = 32 } = options;
    this.type = 'PhongMaterial';

    // 将颜色和镜面高光颜色存储为 uniform 数据
    this.color = new Color(color);
    this.specular = new Color(specular);
    this.shininess = shininess;

    this.vertexShader = `
      attribute vec3 a_position;
      attribute vec3 a_normal;
      uniform mat4 u_mvpMatrix;
      
      varying vec3 v_normal;
      varying vec3 v_worldPosition;

      void main() {
        // 将顶点位置变换到裁剪空间
        gl_Position = u_mvpMatrix * vec4(a_position, 1.0);

        // 将顶点法线变换到世界空间并传递给片元着色器
        v_normal = a_normal;

        // 将世界空间位置传递给片元着色器
        v_worldPosition = a_position;
      }
    `;

    this.fragmentShader = `
      precision mediump float;

      uniform vec3 u_color;
      uniform vec3 u_specular;
      uniform vec3 u_ambientLight; // 环境光
      uniform vec3 u_lightPosition; // 光源位置
      uniform vec3 u_cameraPosition; // 摄像机位置
      uniform float u_shininess; // 镜面高光系数

      varying vec3 v_normal;
      varying vec3 v_worldPosition;

      void main() {
        // 规范化法线
        vec3 normal = normalize(v_normal);

        // 计算光照方向
        vec3 lightDir = normalize(u_lightPosition - v_worldPosition);

        // 计算视线方向
        vec3 viewDir = normalize(u_cameraPosition - v_worldPosition);

        // 计算反射光方向
        vec3 reflectDir = reflect(-lightDir, normal);

        // 环境光 (ambient)
        vec3 ambient = u_ambientLight;

        // 漫反射光 (diffuse)
        float diff = max(dot(lightDir, normal), 0.0);
        vec3 diffuse = diff * u_color;

        // 镜面高光 (specular)
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), u_shininess);
        vec3 specular = spec * u_specular;

        // 合成光照
        vec3 finalColor = ambient + diffuse + specular;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;
  }
}

export default PhongMaterial;
