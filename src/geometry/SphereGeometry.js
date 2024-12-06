import BufferAttribute from '../core/BufferAttribute';
import Geometry from './Geometry';

class SphereGeometry extends Geometry {
  constructor(radius = 1, widthSegments = 16, heightSegments = 32) {
    super();

    widthSegments = Math.max(3, Math.floor(widthSegments));
    heightSegments = Math.max(2, Math.floor(heightSegments));

    const vertices = [];
    const normals = [];
    const indices = [];

    for (let y = 0; y <= heightSegments; y++) {
      const v = y / heightSegments;
      const theta = v * Math.PI;

      for (let x = 0; x <= widthSegments; x++) {
        const u = x / widthSegments;
        const phi = u * 2 * Math.PI;

        const px = -radius * Math.cos(phi) * Math.sin(theta);
        const py = radius * Math.cos(theta);
        const pz = radius * Math.sin(phi) * Math.sin(theta);

        vertices.push(px, py, pz);

        // 计算法线并存入数组
        const nx = px / radius;
        const ny = py / radius;
        const nz = pz / radius;
        normals.push(nx, ny, nz);
      }
    }

    // 生成索引
    for (let y = 0; y < heightSegments; y++) {
      for (let x = 0; x < widthSegments; x++) {
        const a = y * (widthSegments + 1) + x;
        const b = a + widthSegments + 1;
        const c = a + 1;
        const d = b + 1;

        // 每个矩形由两个三角形构成
        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }

    this.setAttribute('position', new BufferAttribute('a_position', new Float32Array(vertices), 3));
    this.setAttribute('normal', new BufferAttribute('a_normal', new Float32Array(normals), 3));
    this.indices = indices;
  }
}

export default SphereGeometry;
