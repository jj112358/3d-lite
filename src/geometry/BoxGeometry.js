import BufferAttribute from '../core/BufferAttribute';
import Geometry from './Geometry';

class BoxGeometry extends Geometry {
  constructor(width = 1, height = 1, depth = 1) {
    super();

    const w = width / 2;
    const h = height / 2;
    const d = depth / 2;

    // 定义立方体的8个顶点
    // prettier-ignore
    const vertices = new Float32Array([
      -w, -h, -d,  w, -h, -d,  w,  h, -d, -w,  h, -d, // 后面
      -w, -h,  d,  w, -h,  d,  w,  h,  d, -w,  h,  d  // 前面
    ]);

    this.setAttribute('position', new BufferAttribute('a_position', vertices, 3));

    // 定义立方体的12个三角面，每个面由两个三角形组成
    // prettier-ignore
    this.indices = [
      0, 1, 2, 0, 2, 3, // 后面
      4, 5, 6, 4, 6, 7, // 前面
      0, 4, 7, 0, 7, 3, // 左面
      1, 5, 6, 1, 6, 2, // 右面
      3, 2, 6, 3, 6, 7, // 上面
      0, 1, 5, 0, 5, 4  // 下面
    ];

    this.initNormals();
  }

  initNormals() {
    const normals = [];

    // 每个面有相同的法线方向
    // prettier-ignore
    const faceNormals = [
      [ 0,  0, -1],  // 后面
      [ 0,  0,  1],  // 前面
      [-1,  0,  0],  // 左面
      [ 1,  0,  0],  // 右面
      [ 0,  1,  0],  // 上面
      [ 0, -1,  0]   // 下面
    ];

    // 由于每个面有4个顶点（两个三角形），所以每个面上的顶点使用相同的法线
    // prettier-ignore
    const indicesForNormals = [
      [0, 1, 2, 3],    // 后面
      [4, 5, 6, 7],    // 前面
      [0, 4, 7, 3],    // 左面
      [1, 5, 6, 2],    // 右面
      [3, 2, 6, 7],    // 上面
      [0, 1, 5, 4]     // 下面
    ];

    // 为每个顶点分配法线
    indicesForNormals.forEach((indices, faceIndex) => {
      const normal = faceNormals[faceIndex];
      indices.forEach((index) => {
        normals[index * 3 + 0] = normal[0];
        normals[index * 3 + 1] = normal[1];
        normals[index * 3 + 2] = normal[2];
      });
    });

    this.setAttribute('normal', new BufferAttribute('a_normal', new Float32Array(normals), 3));
  }
}

export default BoxGeometry;
