import Matrix4 from '../utils/Matrix4';
import Program from './Program'; 

class Renderer {
  constructor(options = {}) {
    const { canvas = document.createElement('canvas'), antialias = false } = options;

    this.domElement = canvas;
    this.gl = canvas.getContext('webgl');
    this.initContext();

    let _pixelRatio = 1;
    let _width = canvas.width;
    let _height = canvas.height;

    this.getPixelRatio = function () {
      return _pixelRatio;
    };
    this.setPixelRatio = function (value) {
      if (value === undefined) return;

      _pixelRatio = value;

      this.setSize(_width, _height);
    };

    this.setSize = function (width, height) {
      _width = width;
      _height = height;

      canvas.style.width = `${_width}px`;
      canvas.style.height = `${_height}px`;

      if (antialias) {
        canvas.width = Math.floor(_width * _pixelRatio);
        canvas.height = Math.floor(_height * _pixelRatio);
      } else {
        canvas.width = _width;
        canvas.height = _height;
      }

      this.gl.viewport(0, 0, canvas.width, canvas.height);
    };
  }

  initContext() {
    const gl = this.gl;
    gl.enable(gl.DEPTH_TEST); // 开启深度测试
    gl.clearColor(0, 0, 0, 1); // 设置背景颜色为黑色
  }

  collectLights(scene) {
    const lights = {
      directional: [],
      point: [],
      ambient: [],
    };

    scene.traverse((object) => {
      if (object.isLight) {
        if (object.type === 'DirectionalLight') {
          lights.directional.push(object);
        } else if (object.type === 'PointLight') {
          lights.point.push(object);
        } else if (object.type === 'AmbientLight') {
          lights.ambient.push(object);
        }
      }
    });

    return lights;
  }

  renderMesh(mesh, camera, lights) {
    const gl = this.gl;
    const { geometry, material } = mesh;

    if (!material.program) {
      material.program = new Program(gl, material.vertexShader, material.fragmentShader);
    }
    const program = material.program;
    program.use();

    this.bindGeometry(program, geometry);
    this.bindMaterial(program, material);
    this.bindLights(program, lights);
    this.bindCommon(program, mesh, camera);

    // 绘制几何
    if (geometry.indices && geometry.indices.length > 0) {
      gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, geometry.attributes.position.count);
    }
  }

  render(scene, camera) {
    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // 清除颜色和深度缓冲

    // 更新阶段(更新相机和场景的状态)
    camera.updateWorldMatrix(true);
    scene.updateWorldMatrix(true);

    // 光照处理阶段
    const lights = this.collectLights(scene);

    // 遍历场景中的所有对象并绘制
    scene.traverse((object) => {
      if (object.isMesh) {
        this.renderMesh(object, camera, lights);
      }
    });
  }

  bindGeometry(program, geometry) {
    // 通过 Program 类的 attributeLocations 来获取属性位置
    for (const key in geometry.attributes) {
      const bufferAttribute = geometry.attributes[key];
      program.bindArrayBuffer(bufferAttribute.attribute, bufferAttribute);
    }

    // 绑定索引缓冲区
    if (geometry.indices && geometry.indices.length > 0) {
      program.bindElementBuffer(geometry.indices);
    }
  }

  bindMaterial(program, material) {
    const uniformMap = {
      u_color: material.color,
      u_specular: material.specular,
      u_shininess: material.shininess,
    };

    program.setUniforms(uniformMap);
  }

  bindLights(program, lights) {
    const uniformMap = {
      u_ambientLight: () => {
        const ambientLight = lights.ambient[0];
        if (ambientLight) {
          return [
            ambientLight.color.r * ambientLight.intensity,
            ambientLight.color.g * ambientLight.intensity,
            ambientLight.color.b * ambientLight.intensity,
          ];
        }
        return [0, 0, 0];
      },
      u_lightPosition: () => {
        const pointLight = lights.point[0];
        if (pointLight) {
          return [pointLight.position.x, pointLight.position.y, pointLight.position.z];
        }
        return [0, 0, 0];
      },
    };

    program.setUniforms(uniformMap);
  }

  bindCommon(program, mesh, camera) {
    const uniformMap = {
      u_cameraPosition: [camera.position.x, camera.position.y, camera.position.z],
      u_mvpMatrix: () => this.computeMVPMatrix(mesh, camera).elements,
    };

    program.setUniforms(uniformMap);
  }

  computeMVPMatrix(object, camera) {
    const modelMatrix = object.worldMatrix;
    const viewMatrix = camera.viewMatrix;
    const projectionMatrix = camera.projectionMatrix;

    // 每次返回一个新的矩阵
    const mvpMatrix = new Matrix4()
      .multiply(projectionMatrix)
      .multiply(viewMatrix)
      .multiply(modelMatrix);

    return mvpMatrix;
  }
}

export default Renderer;
