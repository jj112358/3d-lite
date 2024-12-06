import Vector3 from './Vector3';

class Matrix4 {
  constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    // 如果没有传入参数, 则初始化为单位矩阵, 使用列主序保存
    // prettier-ignore
    this.elements = [
      1, 0, 0, 0, // 第1列
      0, 1, 0, 0, // 第2列
      0, 0, 1, 0, // 第3列
      0, 0, 0, 1, // 第4列
    ];

    if (arguments.length > 0) {
      this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
    }
  }

  set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    const te = this.elements;

    // prettier-ignore-start
    te[0] = n11, te[4] = n12, te[8] = n13, te[12] = n14;
    te[1] = n21, te[5] = n22, te[9] = n23, te[13] = n24;
    te[2] = n31, te[6] = n32, te[10] = n33, te[14] = n34;
    te[3] = n41, te[7] = n42, te[11] = n43, te[15] = n44;
    // prettier-ignore-end

    return this;
  }
  /**
   * 将矩阵设置为单位矩阵。
   * @returns {Matrix4} 更新后的 Matrix4 对象。
   */
  identity() {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    return this;
  }
  /**
   * 复制矩阵。
   * @param {Matrix4} m - 要复制的矩阵。
   * @returns {Matrix4} - 复制后的矩阵。
   */
  copy(m) {
    const te = this.elements;
    const me = m.elements;

    // 将传入矩阵的元素复制到当前矩阵
    for (let i = 0; i < 16; i++) {
      te[i] = me[i];
    }

    return this;
  }
  /**
   * 当前矩阵 x 传入矩阵。会修改当前矩阵。
   * @param {Matrix4} m - 要相乘的矩阵。
   * @returns {Matrix4} - 相乘后的矩阵。
   */
  multiply(m) {
    return this.multiplyMatrices(this, m);
  }
  /**
   * 传入矩阵 x 当前矩阵。会修改当前矩阵。
   * @param {Matrix4} m - 要左乘的矩阵。
   * @returns {Matrix4} - 左乘后的结果矩阵。
   */
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  /**
   * 将两个矩阵相乘，并将结果存储在当前矩阵中。
   * @param {Matrix4} a - 第一个矩阵
   * @param {Matrix4} b - 第二个矩阵
   * @returns {Matrix4} - 相乘后的矩阵
   */
  multiplyMatrices(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[0],
      a12 = ae[4],
      a13 = ae[8],
      a14 = ae[12];
    const a21 = ae[1],
      a22 = ae[5],
      a23 = ae[9],
      a24 = ae[13];
    const a31 = ae[2],
      a32 = ae[6],
      a33 = ae[10],
      a34 = ae[14];
    const a41 = ae[3],
      a42 = ae[7],
      a43 = ae[11],
      a44 = ae[15];

    const b11 = be[0],
      b12 = be[4],
      b13 = be[8],
      b14 = be[12];
    const b21 = be[1],
      b22 = be[5],
      b23 = be[9],
      b24 = be[13];
    const b31 = be[2],
      b32 = be[6],
      b33 = be[10],
      b34 = be[14];
    const b41 = be[3],
      b42 = be[7],
      b43 = be[11],
      b44 = be[15];

    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41; // 第一行第一列
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42; // 第一行第二列
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43; // 第一行第三列
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44; // 第一行第四列

    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41; // 第二行第一列
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42; // 第二行第二列
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43; // 第二行第三列
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44; // 第二行第四列

    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41; // 第三行第一列
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42; // 第三行第二列
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43; // 第三行第三列
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44; // 第三行第四列

    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41; // 第四行第一列
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42; // 第四行第二列
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43; // 第四行第三列
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44; // 第四行第四列

    return this;
  }
  /**
   * 乘以标量。
   *
   * @param {number} s - 标量值。
   * @returns {Matrix4} - 乘以标量后的矩阵。
   */
  multiplyScalar(s) {
    const te = this.elements;

    for (let i = 0; i < 16; i++) {
      te[i] *= s;
    }

    return this;
  }
  /**
   * 计算矩阵的行列式。
   * @returns {number} 矩阵的行列式值。
   */
  determinant() {
    const te = this.elements;

    const n11 = te[0],
      n12 = te[4],
      n13 = te[8],
      n14 = te[12];
    const n21 = te[1],
      n22 = te[5],
      n23 = te[9],
      n24 = te[13];
    const n31 = te[2],
      n32 = te[6],
      n33 = te[10],
      n34 = te[14];
    const n41 = te[3],
      n42 = te[7],
      n43 = te[11],
      n44 = te[15];

    //TODO: make this more efficient
    //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

    return (
      n41 *
      (+n14 * n23 * n32 -
        n13 * n24 * n32 -
        n14 * n22 * n33 +
        n12 * n24 * n33 +
        n13 * n22 * n34 -
        n12 * n23 * n34) +
      n42 *
      (+n11 * n23 * n34 -
        n11 * n24 * n33 +
        n14 * n21 * n33 -
        n13 * n21 * n34 +
        n13 * n24 * n31 -
        n14 * n23 * n31) +
      n43 *
      (+n11 * n24 * n32 -
        n11 * n22 * n34 -
        n14 * n21 * n32 +
        n12 * n21 * n34 +
        n14 * n22 * n31 -
        n12 * n24 * n31) +
      n44 *
      (-n13 * n22 * n31 -
        n11 * n23 * n32 +
        n11 * n22 * n33 +
        n13 * n21 * n32 -
        n12 * n21 * n33 +
        n12 * n23 * n31)
    );
  }
  /**
   * 转置矩阵。
   * @returns {Matrix4} 转置后的矩阵。
   */
  transpose() {
    const te = this.elements;
    let tmp;

    tmp = te[1];
    te[1] = te[4];
    te[4] = tmp;
    tmp = te[2];
    te[2] = te[8];
    te[8] = tmp;
    tmp = te[6];
    te[6] = te[9];
    te[9] = tmp;

    tmp = te[3];
    te[3] = te[12];
    te[12] = tmp;
    tmp = te[7];
    te[7] = te[13];
    te[13] = tmp;
    tmp = te[11];
    te[11] = te[14];
    te[14] = tmp;

    return this;
  }
  /**
   * 计算逆矩阵。会改变当前矩阵。
   * 基于 http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
   * @returns {Matrix4} 逆矩阵
   */
  invert() {
    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    const te = this.elements,
      n11 = te[0],
      n21 = te[1],
      n31 = te[2],
      n41 = te[3],
      n12 = te[4],
      n22 = te[5],
      n32 = te[6],
      n42 = te[7],
      n13 = te[8],
      n23 = te[9],
      n33 = te[10],
      n43 = te[11],
      n14 = te[12],
      n24 = te[13],
      n34 = te[14],
      n44 = te[15],
      t11 =
        n23 * n34 * n42 -
        n24 * n33 * n42 +
        n24 * n32 * n43 -
        n22 * n34 * n43 -
        n23 * n32 * n44 +
        n22 * n33 * n44,
      t12 =
        n14 * n33 * n42 -
        n13 * n34 * n42 -
        n14 * n32 * n43 +
        n12 * n34 * n43 +
        n13 * n32 * n44 -
        n12 * n33 * n44,
      t13 =
        n13 * n24 * n42 -
        n14 * n23 * n42 +
        n14 * n22 * n43 -
        n12 * n24 * n43 -
        n13 * n22 * n44 +
        n12 * n23 * n44,
      t14 =
        n14 * n23 * n32 -
        n13 * n24 * n32 -
        n14 * n22 * n33 +
        n12 * n24 * n33 +
        n13 * n22 * n34 -
        n12 * n23 * n34;

    const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if (det === 0) {return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);}

    const detInv = 1 / det;

    te[0] = t11 * detInv;
    te[1] =
      (n24 * n33 * n41 -
        n23 * n34 * n41 -
        n24 * n31 * n43 +
        n21 * n34 * n43 +
        n23 * n31 * n44 -
        n21 * n33 * n44) *
      detInv;
    te[2] =
      (n22 * n34 * n41 -
        n24 * n32 * n41 +
        n24 * n31 * n42 -
        n21 * n34 * n42 -
        n22 * n31 * n44 +
        n21 * n32 * n44) *
      detInv;
    te[3] =
      (n23 * n32 * n41 -
        n22 * n33 * n41 -
        n23 * n31 * n42 +
        n21 * n33 * n42 +
        n22 * n31 * n43 -
        n21 * n32 * n43) *
      detInv;

    te[4] = t12 * detInv;
    te[5] =
      (n13 * n34 * n41 -
        n14 * n33 * n41 +
        n14 * n31 * n43 -
        n11 * n34 * n43 -
        n13 * n31 * n44 +
        n11 * n33 * n44) *
      detInv;
    te[6] =
      (n14 * n32 * n41 -
        n12 * n34 * n41 -
        n14 * n31 * n42 +
        n11 * n34 * n42 +
        n12 * n31 * n44 -
        n11 * n32 * n44) *
      detInv;
    te[7] =
      (n12 * n33 * n41 -
        n13 * n32 * n41 +
        n13 * n31 * n42 -
        n11 * n33 * n42 -
        n12 * n31 * n43 +
        n11 * n32 * n43) *
      detInv;

    te[8] = t13 * detInv;
    te[9] =
      (n14 * n23 * n41 -
        n13 * n24 * n41 -
        n14 * n21 * n43 +
        n11 * n24 * n43 +
        n13 * n21 * n44 -
        n11 * n23 * n44) *
      detInv;
    te[10] =
      (n12 * n24 * n41 -
        n14 * n22 * n41 +
        n14 * n21 * n42 -
        n11 * n24 * n42 -
        n12 * n21 * n44 +
        n11 * n22 * n44) *
      detInv;
    te[11] =
      (n13 * n22 * n41 -
        n12 * n23 * n41 -
        n13 * n21 * n42 +
        n11 * n23 * n42 +
        n12 * n21 * n43 -
        n11 * n22 * n43) *
      detInv;

    te[12] = t14 * detInv;
    te[13] =
      (n13 * n24 * n31 -
        n14 * n23 * n31 +
        n14 * n21 * n33 -
        n11 * n24 * n33 -
        n13 * n21 * n34 +
        n11 * n23 * n34) *
      detInv;
    te[14] =
      (n14 * n22 * n31 -
        n12 * n24 * n31 -
        n14 * n21 * n32 +
        n11 * n24 * n32 +
        n12 * n21 * n34 -
        n11 * n22 * n34) *
      detInv;
    te[15] =
      (n12 * n23 * n31 -
        n13 * n22 * n31 +
        n13 * n21 * n32 -
        n11 * n23 * n32 -
        n12 * n21 * n33 +
        n11 * n22 * n33) *
      detInv;

    return this;
  }
  /**
   * 构建平移矩阵。
   *
   * @param {number} x - 沿 x 轴的平移量，默认为 0。
   * @param {number} y - 沿 y 轴的平移量，默认为 0。
   * @param {number} z - 沿 z 轴的平移量，默认为 0。
   * @returns {Matrix4} - 平移后的矩阵。
   */
  makeTranslation(x = 0, y = 0, z = 0) {
    // prettier-ignore
    this.set(
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1
    );
    return this;
  }

  /**
   * 构建沿x轴旋转的矩阵。
   * @param {number} theta - 旋转角度（弧度）。
   * @returns {Matrix4} - 旋转后的矩阵。
   */
  makeRotationX(theta) {
    const c = Math.cos(theta),
      s = Math.sin(theta);

    // prettier-ignore
    this.set(
      1, 0, 0, 0,
      0, c, -s, 0,
      0, s, c, 0,
      0, 0, 0, 1
    );
    return this;
  }
  /**
   * 构建沿y轴旋转的矩阵。
   * @param {number} theta - 旋转角度（弧度）。
   * @returns {Matrix4} - 旋转后的矩阵。
   */
  makeRotationY(theta) {
    const c = Math.cos(theta),
      s = Math.sin(theta);

    // prettier-ignore
    this.set(
      c, 0, s, 0,
      0, 1, 0, 0,
      -s, 0, c, 0,
      0, 0, 0, 1
    );
    return this;
  }
  /**
   * 构建沿z轴旋转的矩阵。
   * @param {number} theta - 旋转角度（弧度）。
   * @returns {Matrix4} - 旋转后的矩阵。
   */
  makeRotationZ(theta) {
    const c = Math.cos(theta),
      s = Math.sin(theta);

    // prettier-ignore
    this.set(
      c, -s, 0, 0,
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
    return this;
  }
  /**
   * 构建缩放矩阵。
   * @param {number} x - x 轴缩放比例，默认为 1。
   * @param {number} y - y 轴缩放比例，默认为 1。
   * @param {number} z - z 轴缩放比例，默认为 1。
   * @returns {Matrix4} - 缩放后的矩阵。
   */
  makeScale(x = 1, y = 1, z = 1) {
    // prettier-ignore
    this.set(
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    );
    return this;
  }

  compose(position, quaternion, scale) {
    const te = this.elements;
  
    const { x: sx, y: sy, z: sz } = scale;
    const { x: qx, y: qy, z: qz, w: qw } = quaternion;
  
    // 计算旋转部分的矩阵
    const xx = qx * qx, xy = qx * qy, xz = qx * qz, xw = qx * qw;
    const yy = qy * qy, yz = qy * qz, yw = qy * qw;
    const zz = qz * qz, zw = qz * qw;
  
    te[0] = (1 - 2 * (yy + zz)) * sx;
    te[1] = 2 * (xy + zw) * sx;
    te[2] = 2 * (xz - yw) * sx;
    te[3] = 0;
  
    te[4] = 2 * (xy - zw) * sy;
    te[5] = (1 - 2 * (xx + zz)) * sy;
    te[6] = 2 * (yz + xw) * sy;
    te[7] = 0;
  
    te[8] = 2 * (xz + yw) * sz;
    te[9] = 2 * (yz - xw) * sz;
    te[10] = (1 - 2 * (xx + yy)) * sz;
    te[11] = 0;
  
    // 设置平移部分
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
  
    return this;
  }

  getViewMatrix(eye, lookAt, up) {
    const z = Vector3.sub(eye, lookAt).normalize();
    const x = Vector3.cross(up, z).normalize();
    const y = Vector3.cross(z, x).normalize();

    // 计算旋转矩阵
    // prettier-ignore
    const Rm = new Matrix4().set(
      x.x, x.y, x.z, 0,
      y.x, y.y, y.z, 0,
      z.x, z.y, z.z, 0,
      0, 0, 0, 1
    );

    // 计算平移矩阵
    // prettier-ignore
    const Tm = new Matrix4().set(
      1, 0, 0, -eye.x,
      0, 1, 0, -eye.y,
      0, 0, 1, -eye.z,
      0, 0, 0, 1
    );

    return Rm.multiply(Tm);
  }

  getOrthoMatrix(left, right, top, bottom, near, far) {
    // prettier-ignore
    this.set(
      2 / (right - left), 0, 0, -(right + left) / (right - left),
      0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom),
      0, 0, -2 / (far - near), -(far + near) / (far - near),
      0, 0, 0, 1
    );
    return this;
  }

  /**
   * 构建透视投影矩阵。
   * @param {number} fov - 视角，弧度。
   * @param {number} aspect - 纵横比。
   * @param {number} near - 近裁剪面。
   * @param {number} far - 远裁剪面。
   * @returns {Matrix4} - 透视投影矩阵。
   */
  getPerspMatrix(fov, aspect, near, far) {
    fov = (fov * Math.PI) / 180;
    const f = 1 / Math.tan(fov / 2);

    // prettier-ignore
    this.set(
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near),
      0, 0, -1, 0
    );
    return this;
  }

  /**
   * 使用数组设置矩阵的值。
   *
   * @param {number[]} array - 包含矩阵元素的数组，长度必须为16。
   * @returns {Matrix4} - 返回更新后的矩阵。
   * @throws {Error} - 如果数组长度小于16，则抛出错误。
   */
  fromArray(array) {
    if (array.length < 16) {
      throw new Error('array length must be 16+');
    }
    for (let i = 0; i < 16; i++) {
      this.elements[i] = array[i];
    }
    return this;
  }
  /**
   * 将矩阵的元素转换为数组形式。
   * @returns {Array} 包含矩阵元素的数组。
   */
  toArray() {
    return this.elements;
  }
  print() {
    const te = this.elements;
    const arr = {
      1: { 1: te[0], 2: te[4], 3: te[8], 4: te[12] },
      2: { 1: te[1], 2: te[5], 3: te[9], 4: te[13] },
      3: { 1: te[2], 2: te[6], 3: te[10], 4: te[14] },
      4: { 1: te[3], 2: te[7], 3: te[11], 4: te[15] },
    };
    console.table(arr);
  }
}

export default Matrix4;
