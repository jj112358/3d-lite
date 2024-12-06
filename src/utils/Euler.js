import Matrix4 from './Matrix4.js';
import Quaternion from './Quaternion.js';

class Euler {
  constructor(x = 0, y = 0, z = 0, order = 'XYZ') {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;

    this.onChangeCallback = () => {};
  }

  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this._onChange();
  }

  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this._onChange();
  }

  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value;
    this._onChange();
  }

  get order() {
    return this._order;
  }
  set order(value) {
    this._order = value;
    this._onChange();
  }

  set(x, y, z, order = this._order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;
    this._onChange();
    return this;
  }

  setFromQuaternion(q, order = this._order, update = true) {
    const matrix = new Matrix4();
    matrix.makeRotationFromQuaternion(q);
    return this.setFromRotationMatrix(matrix, order, update);
  }

  setFromRotationMatrix(m, order = this._order, update = true) {
    const te = m.elements;
    const m11 = te[0],  m12 = te[4],  m13 = te[8];
    const m21 = te[1],  m22 = te[5],  m23 = te[9];
    const m31 = te[2],  m32 = te[6],  m33 = te[10];

    switch (order) {
      case 'XYZ':
        this._y = Math.asin(Math.min(Math.max(m13, -1), 1));
        if (Math.abs(m13) < 0.99999) {
          this._x = Math.atan2(-m23, m33);
          this._z = Math.atan2(-m12, m11);
        } else {
          this._x = Math.atan2(m32, m22);
          this._z = 0;
        }
        break;

      case 'YXZ':
        this._x = Math.asin(-Math.min(Math.max(m23, -1), 1));
        if (Math.abs(m23) < 0.99999) {
          this._y = Math.atan2(m13, m33);
          this._z = Math.atan2(m21, m22);
        } else {
          this._y = Math.atan2(-m31, m11);
          this._z = 0;
        }
        break;

      case 'ZXY':
        this._x = Math.asin(Math.min(Math.max(m32, -1), 1));
        if (Math.abs(m32) < 0.99999) {
          this._y = Math.atan2(-m31, m33);
          this._z = Math.atan2(-m12, m22);
        } else {
          this._y = 0;
          this._z = Math.atan2(m21, m11);
        }
        break;

      case 'ZYX':
        this._y = Math.asin(-Math.min(Math.max(m31, -1), 1));
        if (Math.abs(m31) < 0.99999) {
          this._x = Math.atan2(m32, m33);
          this._z = Math.atan2(m21, m11);
        } else {
          this._x = 0;
          this._z = Math.atan2(-m12, m22);
        }
        break;

      case 'YZX':
        this._z = Math.asin(Math.min(Math.max(m21, -1), 1));
        if (Math.abs(m21) < 0.99999) {
          this._x = Math.atan2(-m23, m22);
          this._y = Math.atan2(-m31, m11);
        } else {
          this._x = 0;
          this._y = Math.atan2(m13, m33);
        }
        break;

      case 'XZY':
        this._z = Math.asin(-Math.min(Math.max(m12, -1), 1));
        if (Math.abs(m12) < 0.99999) {
          this._x = Math.atan2(m32, m22);
          this._y = Math.atan2(m13, m11);
        } else {
          this._x = Math.atan2(-m23, m33);
          this._y = 0;
        }
        break;

      default:
        console.warn(`Euler: Unknown order "${order}"`);
    }

    this._order = order;

    if (update) this._onChange();

    return this;
  }

  toQuaternion(target = new Quaternion()) {
    const c1 = Math.cos(this._x / 2);
    const c2 = Math.cos(this._y / 2);
    const c3 = Math.cos(this._z / 2);
    const s1 = Math.sin(this._x / 2);
    const s2 = Math.sin(this._y / 2);
    const s3 = Math.sin(this._z / 2);

    switch (this._order) {
      case 'XYZ':
        target.set(
          s1 * c2 * c3 + c1 * s2 * s3,
          c1 * s2 * c3 - s1 * c2 * s3,
          c1 * c2 * s3 + s1 * s2 * c3,
          c1 * c2 * c3 - s1 * s2 * s3
        );
        break;

      case 'YXZ':
        target.set(
          s1 * c2 * c3 + c1 * s2 * s3,
          c1 * s2 * c3 - s1 * c2 * s3,
          c1 * c2 * s3 - s1 * s2 * c3,
          c1 * c2 * c3 + s1 * s2 * s3
        );
        break;

      // 添加其他顺序类似 XYZ
    }

    return target;
  }

  clone() {
    return new Euler(this._x, this._y, this._z, this._order);
  }

  copy(euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;
    this._onChange();
    return this;
  }

  toArray(array = [], offset = 0) {
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._order;
    return array;
  }

  fromArray(array, offset = 0) {
    this._x = array[offset];
    this._y = array[offset + 1];
    this._z = array[offset + 2];
    this._order = array[offset + 3];
    this._onChange();
    return this;
  }

  onChange(callback) {
    this.onChangeCallback = callback;
    return this;
  }

  _onChange() {
    this.onChangeCallback();
  }
}

export default Euler;
