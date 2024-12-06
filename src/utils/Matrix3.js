/**
 * 3x3 矩阵类，用于表示和操作 3x3 矩阵。
 * 在保存时，以列主序的方式保存。
 */
class Matrix3 {
  constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    /**
     * e0 e3 e6
     * e1 e4 e7
     * e2 e5 e8
     */
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    if (n11 !== undefined) {
      this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
    }
  }
  /**
   * 计算两个 Matrix3 实例的乘积。
   *
   * @static
   * @param {Matrix3} a - 第一个 Matrix3 实例。
   * @param {Matrix3} b - 第二个 Matrix3 实例。
   * @returns {Matrix3} 返回两个矩阵的乘积。
   */
  static multiply(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const rm = new Matrix3();
    const re = rm.elements;

    const a11 = ae[0],
      a12 = ae[3],
      a13 = ae[6];
    const a21 = ae[1],
      a22 = ae[4],
      a23 = ae[7];
    const a31 = ae[2],
      a32 = ae[5],
      a33 = ae[8];

    const b11 = be[0],
      b12 = be[3],
      b13 = be[6];
    const b21 = be[1],
      b22 = be[4],
      b23 = be[7];
    const b31 = be[2],
      b32 = be[5],
      b33 = be[8];

    re[0] = a11 * b11 + a12 * b21 + a13 * b31;
    re[3] = a11 * b12 + a12 * b22 + a13 * b32;
    re[6] = a11 * b13 + a12 * b23 + a13 * b33;

    re[1] = a21 * b11 + a22 * b21 + a23 * b31;
    re[4] = a21 * b12 + a22 * b22 + a23 * b32;
    re[7] = a21 * b13 + a22 * b23 + a23 * b33;

    re[2] = a31 * b11 + a32 * b21 + a33 * b31;
    re[5] = a31 * b12 + a32 * b22 + a33 * b32;
    re[8] = a31 * b13 + a32 * b23 + a33 * b33;

    return rm;
  }
  /**
   * 创建一个平移矩阵。
   *
   * @static
   * @param {number} x - x 方向的平移距离。
   * @param {number} y - y 方向的平移距离。
   * @returns {Matrix3} 返回一个新的平移矩阵。
   */
  static makeTranslation(x, y) {
    const tm = new Matrix3();
    tm.set(1, 0, x, 0, 1, y, 0, 0, 1);

    return tm;
  }
  /**
   * 创建一个旋转矩阵。
   *
   * @static
   * @param {number} theta - 旋转的角度，单位为弧度。
   * @returns {Matrix3} 返回一个新的旋转矩阵。
   */
  static makeRotation(theta) {
    const rm = new Matrix3();
    let c = Math.cos(theta);
    let s = Math.sin(theta);

    // 做一个简易的归0化, 如果当c或者s的值非常接近0的时候, 将其归0
    if (Math.abs(c - 0) < Number.EPSILON) {
      c = 0;
    }

    if (Math.abs(s - 0) < Number.EPSILON) {
      s = 0;
    }

    rm.set(c, -s, 0, s, c, 0, 0, 0, 1);

    return rm;
  }
  /**
   * 创建一个缩放矩阵。
   *
   * @static
   * @param {number} x - x 方向的缩放因子。
   * @param {number} y - y 方向的缩放因子。
   * @returns {Matrix3} 返回一个新的缩放矩阵。
   */
  static makeScale(x, y) {
    const sm = new Matrix3();
    sm.set(x, 0, 0, 0, y, 0, 0, 0, 1);

    return sm;
  }
  /**
   * 判断两个 Matrix3 实例是否相等。
   *
   * @static
   * @param {Matrix3} a - 第一个 Matrix3 实例。
   * @param {Matrix3} b - 第二个 Matrix3 实例。
   * @returns {boolean} 如果两个矩阵相等，则返回 true，否则返回 false。
   */
  static equals(a, b) {
    const ae = a.elements;
    const be = b.elements;

    for (let i = 0; i < 9; i++) {
      if (ae[i] !== be[i]) {return false;}
    }

    return true;
  }
  /**
   * 打印 Matrix3 实例的元素，以行列的形式表示。
   *
   * @static
   * @param {Matrix3} m - 要打印的 Matrix3 实例。
   */
  static print(m) {
    const e = m.elements;
    const arr = {
      1: { 1: e[0], 2: e[3], 3: e[6] },
      2: { 1: e[1], 2: e[4], 3: e[7] },
      3: { 1: e[2], 2: e[5], 3: e[8] },
    };
    console.table(arr);
  }
  /**
   * 设置 Matrix3 实例的元素。
   * 输入参数按照行主序排列，但在保存时按照列主序保存。
   * 举例
   * set(1,2,3,4,5,6,7,8,9) =>
   * 1 2 3
   * 4 5 6
   * 7 8 9
   * 保存时, 按照列主序 elements: [1, 4, 7, 2, 5, 8, 3, 6, 9]
   */
  set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    const te = this.elements;
    te[0] = n11; // 第1行第1列
    te[1] = n21; // 第2行第1列
    te[2] = n31;
    te[3] = n12;
    te[4] = n22;
    te[5] = n32;
    te[6] = n13;
    te[7] = n23;
    te[8] = n33;
    return this;
  }
  /**
   * 将 Matrix3 实例重置为单位矩阵。
   *
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  identity() {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);

    return this;
  }
  /**
   * 将传入的 Matrix3 实例的元素复制到当前实例。
   *
   * @param {Matrix3} m - 要复制的 Matrix3 实例。
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  copy(m) {
    const te = this.elements;
    const me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];

    return this;
  }
  /**
   * 当前矩阵 x 传入矩阵，
   * 并将结果保存到当前实例。
   *
   * @param {Matrix3} m - 要乘的 Matrix3 实例。
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  multiply(m) {
    return this.multiplyMatrices(this, m);
  }
  /**
   * 传入矩阵 x 当前矩阵，
   * 并将结果保存到当前实例。这是左乘操作，即传入的矩阵在左，当前矩阵在右。
   *
   * @param {Matrix3} m - 要乘的 Matrix3 实例。
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  /**
   * 计算两个 Matrix3 实例的乘积，并将结果保存到当前实例。
   *
   * @param {Matrix3} a - 第一个 Matrix3 实例。
   * @param {Matrix3} b - 第二个 Matrix3 实例。
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  multiplyMatrices(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[0],
      a12 = ae[3],
      a13 = ae[6];
    const a21 = ae[1],
      a22 = ae[4],
      a23 = ae[7];
    const a31 = ae[2],
      a32 = ae[5],
      a33 = ae[8];

    const b11 = be[0],
      b12 = be[3],
      b13 = be[6];
    const b21 = be[1],
      b22 = be[4],
      b23 = be[7];
    const b31 = be[2],
      b32 = be[5],
      b33 = be[8];

    te[0] = a11 * b11 + a12 * b21 + a13 * b31;
    te[3] = a11 * b12 + a12 * b22 + a13 * b32;
    te[6] = a11 * b13 + a12 * b23 + a13 * b33;

    te[1] = a21 * b11 + a22 * b21 + a23 * b31;
    te[4] = a21 * b12 + a22 * b22 + a23 * b32;
    te[7] = a21 * b13 + a22 * b23 + a23 * b33;

    te[2] = a31 * b11 + a32 * b21 + a33 * b31;
    te[5] = a31 * b12 + a32 * b22 + a33 * b32;
    te[8] = a31 * b13 + a32 * b23 + a33 * b33;

    return this;
  }
  /**
   * 将 Matrix3 实例的每个元素乘以一个标量。
   *
   * @param {number} s - 乘法的标量。
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  multiplyScalar(s) {
    const te = this.elements;

    te[0] *= s;
    te[3] *= s;
    te[6] *= s;
    te[1] *= s;
    te[4] *= s;
    te[7] *= s;
    te[2] *= s;
    te[5] *= s;
    te[8] *= s;

    return this;
  }
  /**
   * 计算 Matrix3 实例的行列式。
   *
   * @returns {number} 返回 Matrix3 实例的行列式。
   */
  determinant() {
    const te = this.elements;

    const a = te[0],
      b = te[1],
      c = te[2],
      d = te[3],
      e = te[4],
      f = te[5],
      g = te[6],
      h = te[7],
      i = te[8];

    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  }
  /**
   * 计算当前 Matrix3 实例的逆矩阵，并将结果保存到当前实例。
   * 如果当前矩阵不可逆（即行列式为 0），则所有元素都设置为 0。
   *
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  invert() {
    const te = this.elements,
      n11 = te[0],
      n21 = te[1],
      n31 = te[2],
      n12 = te[3],
      n22 = te[4],
      n32 = te[5],
      n13 = te[6],
      n23 = te[7],
      n33 = te[8],
      t11 = n33 * n22 - n32 * n23,
      t12 = n32 * n13 - n33 * n12,
      t13 = n23 * n12 - n22 * n13,
      det = n11 * t11 + n21 * t12 + n31 * t13;

    if (det === 0) {return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);}

    const detInv = 1 / det;

    // 有可能存在-0的情况, 都加0, 做转换
    te[0] = t11 * detInv + 0;
    te[1] = (n31 * n23 - n33 * n21) * detInv + 0;
    te[2] = (n32 * n21 - n31 * n22) * detInv + 0;

    te[3] = t12 * detInv + 0;
    te[4] = (n33 * n11 - n31 * n13) * detInv + 0;
    te[5] = (n31 * n12 - n32 * n11) * detInv + 0;

    te[6] = t13 * detInv + 0;
    te[7] = (n21 * n13 - n23 * n11) * detInv + 0;
    te[8] = (n22 * n11 - n21 * n12) * detInv + 0;

    return this;
  }
  /**
   * 计算当前 Matrix3 实例的转置矩阵，并将结果保存到当前实例。
   *
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  transpose() {
    let tmp;
    const m = this.elements;

    tmp = m[1];
    m[1] = m[3];
    m[3] = tmp;
    tmp = m[2];
    m[2] = m[6];
    m[6] = tmp;
    tmp = m[5];
    m[5] = m[7];
    m[7] = tmp;

    return this;
  }
  /**
   * 将当前 Matrix3 实例应用缩放变换。
   * 缩放矩阵 x 当前矩阵
   * @param {number} sx - x 方向的缩放因子。
   * @param {number} sy - y 方向的缩放因子。
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  scale(sx, sy) {
    this.premultiply(Matrix3.makeScale(sx, sy));

    return this;
  }
  /**
   * 将当前 Matrix3 实例应用旋转变换。
   * 旋转矩阵 x 当前矩阵
   * @param {number} theta - 旋转的角度，单位为弧度。
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  rotate(theta) {
    this.premultiply(Matrix3.makeRotation(theta));

    return this;
  }
  /**
   * 将当前 Matrix3 实例应用平移变换。
   * 平移矩阵 x 当前矩阵
   * @param {number} tx - x 方向的平移距离。
   * @param {number} ty - y 方向的平移距离。
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  translate(tx, ty) {
    this.premultiply(Matrix3.makeTranslation(tx, ty));

    return this;
  }
  /**
   * 检查当前 Matrix3 实例是否与传入的 Matrix3 实例相等。
   * 这是通过比较两个矩阵的每个元素来实现的。
   *
   * @param {Matrix3} matrix - 要比较的 Matrix3 实例。
   * @returns {boolean} 如果两个矩阵相等，则返回 true，否则返回 false。
   */
  equals(m) {
    return Matrix3.equals(this, m);
  }
  /**
   * 从数组中复制元素到当前 Matrix3 实例。
   *
   * @param {Array<number>} array - 包含元素的数组。
   * @param {number} [offset=0] - 在数组中开始复制的索引。
   * @returns {Matrix3} 返回当前 Matrix3 实例。
   */
  fromArray(array, offset = 0) {
    for (let i = 0; i < 9; i++) {
      this.elements[i] = array[i + offset];
    }

    return this;
  }
  toArray() {
    const te = this.elements;

    return [te[0], te[1], te[2], te[3], te[4], te[5], te[6], te[7], te[8]];
  }
  /**
   * 创建当前 Matrix3 实例的一个副本。
   *
   * @returns {Matrix3} 返回新的 Matrix3 实例，其元素与当前实例相同。
   */
  clone() {
    return new Matrix3().fromArray(this.elements);
  }
  /**
   * 打印当前 Matrix3 实例的元素，以行列式表示。
   */
  print() {
    Matrix3.print(this);
  }
}

export default Matrix3;
