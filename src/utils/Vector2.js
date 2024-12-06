/**
 * Vector2类表示一个二维向量或者一个点在二维空间的位置。
 */
class Vector2 {
  /**
   * 创建一个新的Vector2实例。
   * @param {number} x - x坐标，默认值为0。
   * @param {number} y - y坐标，默认值为0。
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /**
   * 获取当前向量的长度（模）。
   * @returns {number} - 当前向量的长度。
   */
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * 获取当前向量的角度（以弧度为单位）。
   * @returns {number} - 当前向量的角度，范围是[0, 2π]。
   */
  get angle() {
    const angle = Math.atan2(-this.y, -this.x) + Math.PI;

    return angle;
  }
  /**
   * 返回两个Vector2实例的和。
   * @param {Vector2} a - 第一个向量。
   * @param {Vector2} b - 第二个向量。
   * @returns {Vector2} - 向量a和向量b的和。
   */
  static add(a, b) {
    const r = new Vector2();
    r.x = a.x + b.x;
    r.y = a.y + b.y;
    return r;
  }
  /**
   * 返回两个Vector2实例的差。
   * @param {Vector2} a - 第一个向量。
   * @param {Vector2} b - 第二个向量。
   * @returns {Vector2} - 向量a和向量b的差。
   */
  static sub(a, b) {
    const r = new Vector2();
    r.x = a.x - b.x;
    r.y = a.y - b.y;
    return r;
  }
  /**
   * 返回两个Vector2实例的点积。
   * @param {Vector2} a - 第一个向量。
   * @param {Vector2} b - 第二个向量。
   * @returns {number} - 向量a和向量b的点积。
   */
  static dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }
  /**
   * 返回两个Vector2实例的叉积。
   * @param {Vector2} a - 第一个向量。
   * @param {Vector2} b - 第二个向量。
   * @returns {number} - 向量a和向量b的叉积。
   */
  static cross(a, b) {
    return a.x * b.y - a.y * b.x;
  }
  /**
   * 判断两个Vector2实例是否相等。
   * @param {Vector2} a - 第一个向量。
   * @param {Vector2} b - 第二个向量。
   * @returns {boolean} - 如果向量a和向量b相等，则返回true，否则返回false。
   */
  static equals(a, b) {
    return a.x === b.x && a.y === b.y;
  }
  /**
   * 设置向量的x和y值。
   * @param {number} x - 新的x值。
   * @param {number} y - 新的y值。
   * @returns {Vector2} - 返回当前向量实例。
   */
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  /**
   * 克隆当前向量，创建一个新的Vector2实例。
   * @returns {Vector2} - 返回一个新的Vector2实例，其x和y值与当前向量相同。
   */
  clone() {
    return new Vector2(this.x, this.y);
  }
  /**
   * 将传入的向量加到当前向量上。
   * @param {Vector2} v - 要加的向量。
   * @returns {Vector2} - 返回当前向量实例。
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }
  /**
   * 从当前向量中减去传入的向量。
   * @param {Vector2} v - 要减的向量。
   * @returns {Vector2} - 返回当前向量实例。
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }
  /**
   * 将当前向量乘以一个标量。
   * @param {number} scalar - 要乘的标量。
   * @returns {Vector2} - 返回当前向量实例。
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }
  /**
   * 计算当前向量和传入向量的点积。
   * @param {Vector2} v - 另一个向量。
   * @returns {number} - 当前向量和向量v的点积。
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  /**
   * 计算当前向量和传入向量的叉积。
   * @param {Vector2} v - 另一个向量。
   * @returns {number} - 当前向量和向量v的叉积。
   */
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * 获取当前向量长度的平方。
   * @returns {number} - 当前向量长度的平方。
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * 判断当前向量是否和传入的向量相等。
   * @param {Vector2} v - 另一个向量。
   * @returns {boolean} - 如果当前向量和向量v相等，则返回true，否则返回false。
   */
  equals(v) {
    return v.x === this.x && v.y === this.y;
  }
  /**
   * 从数组中设置当前向量的x和y值。
   * @param {Array} array - 包含x和y值的数组。
   * @param {number} offset - 在数组中开始读取的偏移量，默认为0。
   * @returns {Vector2} - 返回当前向量实例。
   */
  fromArray(array, offset = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];

    return this;
  }
  /**
   * 将当前向量的x和y值存入数组。
   * @param {Array} array - 要存入的数组。
   * @param {number} offset - 在数组中开始存入的偏移量，默认为0。
   * @returns {Array} - 返回包含x和y值的数组。
   */
  toArray(array, offset = 0) {
    array[offset] = this.x;
    array[offset + 1] = this.y;

    return array;
  }
  /**
   * 从一个角度设置当前向量的x和y值。
   * @param {number} angle - 角度，单位为弧度。
   * @returns {Vector2} - 返回当前向量实例。
   */
  fromAngle(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    this.x = c;
    this.y = s;
    return this;
  }
  /**
   * 旋转当前向量一个给定的角度。
   * @param {number} angle - 要旋转的角度，单位为弧度。
   * @returns {Vector2} - 返回当前向量实例。
   */
  rotate(angle) {
    const { x, y } = this;
    let c = Math.cos(angle);
    let s = Math.sin(angle);

    // 做一个简易的归0化, 如果当c或者s的值非常接近0的时候, 将其归0
    if (Math.abs(c - 0) < Number.EPSILON) {
      c = 0;
    }

    if (Math.abs(s - 0) < Number.EPSILON) {
      s = 0;
    }

    this.x = x * c - y * s;
    this.y = x * s + y * c;
    return this;
  }
}

export default Vector2;
