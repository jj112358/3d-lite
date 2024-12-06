/**
 * 颜色类
 */
class Color {
  /**
   * @param {float} r 红色值: 取值范围 [0, 1] 或者 只传一个参数, 当作Hex值
   * @param {float} g 绿色值: 取值范围 [0, 1]
   * @param {float} b 蓝色值: 取值范围 [0, 1]
   */
  constructor(r, g, b) {
    this.r = 1;
    this.g = 1;
    this.b = 1;

    return this.set(r, g, b);
  }

  set(r, g, b) {
    if (g === undefined && b === undefined) {
      // 如果只传了一个参数, 当作Hex值处理
      this.setHex(r);
    } else {
      // 否则当作RGB值处理
      this.setRGB(r, g, b);
    }

    return this;
  }

  setHex(hex) {
    hex = Math.floor(hex);
    this.r = ((hex >> 16) & 255) / 255;
    this.g = ((hex >> 8) & 255) / 255;
    this.b = (hex & 255) / 255;
    return this;
  }

  setRGB(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  clone() {
    return new Color(this.r, this.g, this.b);
  }

  multiply(color) {
    this.r *= color.r;
    this.g *= color.g;
    this.b *= color.b;

    return this;
  }

  multiplyScalar(scalar) {
    this.r *= scalar;
    this.g *= scalar;
    this.b *= scalar;

    return this;
  }

  add(color) {
    this.r += color.r;
    this.g += color.g;
    this.b += color.b;

    return this;
  }

  toArray() {
    return [this.r, this.g, this.b];
  }

  *[Symbol.iterator]() {
    yield this.r;
    yield this.g;
    yield this.b;
  }
}

export default Color;
