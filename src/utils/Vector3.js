/**
 * 三维向量类。
 */
class Vector3 {
  /**
   * 创建一个新的三维向量。
   *
   * @param {number} x - 向量的 x 分量，默认为 0。
   * @param {number} y - 向量的 y 分量，默认为 0。
   * @param {number} z - 向量的 z 分量，默认为 0。
   */
  constructor(x = 0, y = 0, z = 0) {
    Vector3.prototype.isVector3 = true;

    this.type = 'Vector3';

    this.x = x;
    this.y = y;
    this.z = z;
  }
  /**
   * 获取向量的长度。
   *
   * @returns {number} 向量的长度。
   */
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * 添加两个三维向量。
   *
   * @param {Vector3} a - 第一个向量。
   * @param {Vector3} b - 第二个向量。
   * @returns {Vector3} 结果向量。
   */
  static add(a, b) {
    const r = new Vector3();
    r.x = a.x + b.x;
    r.y = a.y + b.y;
    r.z = a.z + b.z;
    return r;
  }
  /**
   * 从第一个三维向量中减去第二个向量。
   *
   * @param {Vector3} a - 第一个向量。
   * @param {Vector3} b - 第二个向量。
   * @returns {Vector3} 结果向量。
   */
  static sub(a, b) {
    const r = new Vector3();
    r.x = a.x - b.x;
    r.y = a.y - b.y;
    r.z = a.z - b.z;
    return r;
  }
  /**
   * 计算两个三维向量的点积。
   *
   * @param {Vector3} a - 第一个向量。
   * @param {Vector3} b - 第二个向量。
   * @returns {number} 两个向量的点积。
   */
  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  /**
   * 计算两个 Vector3 实例的叉积。
   *
   * @static
   * @param {Vector3} a - 第一个向量实例。
   * @param {Vector3} b - 第二个向量实例。
   * @returns {Vector3} 返回两个向量的叉积。
   */
  static cross(a, b) {
    const ax = a.x,
      ay = a.y,
      az = a.z;
    const bx = b.x,
      by = b.y,
      bz = b.z;

    const r = new Vector3();

    r.x = ay * bz - az * by;
    r.y = az * bx - ax * bz;
    r.z = ax * by - ay * bx;

    return r;
  }
  /**
   * 判断两个 Vector3 实例是否相等。
   *
   * @static
   * @param {Vector3} a - 第一个向量实例。
   * @param {Vector3} b - 第二个向量实例。
   * @returns {boolean} 如果两个向量相等，则返回 true，否则返回 false。
   */
  static equals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z;
  }
  /**
   * 设置 Vector3 实例的 x、y 和 z 值。
   *
   * @param {number} x - 新的 x 值。
   * @param {number} y - 新的 y 值。
   * @param {number} z - 新的 z 值。
   * @returns {Vector3} 返回当前 Vector3 实例。
   */
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  /**
   * 克隆当前 Vector3 实例。
   *
   * @returns {Vector3} 返回一个新的 Vector3 实例，其值与当前实例相同。
   */
  clone() {
    return new Vector3(this.x, this.y, this.z);
  }
  /**
   * 将另一个 Vector3 实例的值复制到当前实例。
   *
   * @param {Vector3} v - 要复制的 Vector3 实例。
   * @returns {Vector3} 返回当前实例。
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;

    return this;
  }
  /**
   * 将传入的 Vector3 实例与当前实例进行加法运算。
   *
   * @param {Vector3} v - 传入的 Vector3 实例。
   * @returns {Vector3} 返回当前 Vector3 实例。
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
  }
  /**
   * 将传入的 Vector3 实例与当前实例进行减法运算。
   *
   * @param {Vector3} v - 传入的 Vector3 实例。
   * @returns {Vector3} 返回当前 Vector3 实例。
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

    return this;
  }
  /**
   * 将当前 Vector3 实例与一个标量进行数乘运算。
   *
   * @param {number} scalar - 用于数乘的标量。
   * @returns {Vector3} 返回当前 Vector3 实例。
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;

    return this;
  }
  /**
   * 计算当前 Vector3 实例与传入的 Vector3 实例的点积。
   *
   * @param {Vector3} v - 传入的 Vector3 实例。
   * @returns {number} 返回两个向量的点积。
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  /**
   * 计算当前 Vector3 实例与传入的 Vector3 实例的叉积。
   *
   * @param {Vector3} v - 传入的 Vector3 实例。
   * @returns {Vector3} 返回当前 Vector3 实例。
   */
  cross(v) {
    const ax = this.x,
      ay = this.y,
      az = this.z;
    const bx = v.x,
      by = v.y,
      bz = v.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
  }
  /**
   * 计算当前 Vector3 实例的长度的平方。
   *
   * @returns {number} 返回向量长度的平方。
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * 判断当前 Vector3 实例是否与传入的 Vector3 实例相等。
   *
   * @param {Vector3} v - 传入的 Vector3 实例。
   * @returns {boolean} 如果两个向量相等，则返回 true，否则返回 false。
   */
  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
  }

  /**
   * 将向量归一化。
   * @returns {Vector3} 归一化后的向量。
   */
  normalize() {
    const length = this.length;
    if (length === 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    } else {
      this.x /= length;
      this.y /= length;
      this.z /= length;
    }
    return this;
  }

  /**
   * 计算当前 Vector3 实例到另一个 Vector3 实例的距离。
   *
   * @param {Vector3} v - 目标向量。
   * @returns {number} 当前向量到目标向量的距离。
   */
  distanceTo(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  /**
   * 从数组中获取 x、y 和 z 值并设置到当前 Vector3 实例。
   *
   * @param {Array} array - 包含 x、y 和 z 值的数组。
   * @param {number} offset - 在数组中开始读取值的偏移量，默认为 0。
   * @returns {Vector3} 返回当前 Vector3 实例。
   */
  fromArray(array, offset = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];

    return this;
  }
  /**
   * 将当前 Vector3 实例的 x、y 和 z 值输出到数组中。
   */
  toArray() {
    return [this.x, this.y, this.z];
  }
  /**
   * 将当前 Vector3 实例应用到一个 3x3 矩阵。
   *
   * @param {Matrix3} m - 用于变换的 3x3 矩阵。
   * @returns {Vector3} 返回当前 Vector3 实例。
   */
  applyMatrix3(m) {
    const x = this.x,
      y = this.y,
      z = this.z;
    const e = m.elements;

    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;

    return this;
  }
  applyMatrix4(m) {
    const x = this.x,
      y = this.y,
      z = this.z;
    const e = m.elements;

    this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
    this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
    this.z = e[2] * x + e[6] * y + e[10] * z + e[14];

    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }
}

export default Vector3;
