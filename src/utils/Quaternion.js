class Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x; // x分量
    this.y = y; // y分量
    this.z = z; // z分量
    this.w = w; // w分量
  }

  // 设置四元数的值
  set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  // 从轴和角度生成四元数
  setFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2;
    const s = Math.sin(halfAngle);

    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos(halfAngle);

    return this.normalize();
  }

  // 从旋转矩阵生成四元数
  setFromRotationMatrix(matrix) {
    const m = matrix.elements;
    const trace = m[0] + m[5] + m[10];

    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1.0);
      this.w = 0.25 / s;
      this.x = (m[6] - m[9]) * s;
      this.y = (m[8] - m[2]) * s;
      this.z = (m[1] - m[4]) * s;
    } else if (m[0] > m[5] && m[0] > m[10]) {
      const s = 2.0 * Math.sqrt(1.0 + m[0] - m[5] - m[10]);
      this.w = (m[6] - m[9]) / s;
      this.x = 0.25 * s;
      this.y = (m[1] + m[4]) / s;
      this.z = (m[8] + m[2]) / s;
    } else if (m[5] > m[10]) {
      const s = 2.0 * Math.sqrt(1.0 + m[5] - m[0] - m[10]);
      this.w = (m[8] - m[2]) / s;
      this.x = (m[1] + m[4]) / s;
      this.y = 0.25 * s;
      this.z = (m[6] + m[9]) / s;
    } else {
      const s = 2.0 * Math.sqrt(1.0 + m[10] - m[0] - m[5]);
      this.w = (m[1] - m[4]) / s;
      this.x = (m[8] + m[2]) / s;
      this.y = (m[6] + m[9]) / s;
      this.z = 0.25 * s;
    }

    return this.normalize();
  }

  // 四元数归一化
  normalize() {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
    if (length === 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 1;
    } else {
      const invLength = 1 / length;
      this.x *= invLength;
      this.y *= invLength;
      this.z *= invLength;
      this.w *= invLength;
    }
    return this;
  }

  // 四元数相乘
  multiply(q) {
    const x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
    const y = this.w * q.y + this.y * q.w + this.z * q.x - this.x * q.z;
    const z = this.w * q.z + this.z * q.w + this.x * q.y - this.y * q.x;
    const w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z;

    return this.set(x, y, z, w);
  }

  // 四元数与向量相乘，返回旋转后的向量
  applyToVector3(v) {
    const q = new Quaternion(v.x, v.y, v.z, 0);
    const qConjugate = new Quaternion(-this.x, -this.y, -this.z, this.w);

    q.multiply(this).multiply(qConjugate);

    v.x = q.x;
    v.y = q.y;
    v.z = q.z;

    return v;
  }

  // 四元数插值（球面线性插值）
  slerp(q, t) {
    let cosHalfTheta = this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;

    if (cosHalfTheta < 0) {
      this.w = -q.w;
      this.x = -q.x;
      this.y = -q.y;
      this.z = -q.z;
      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(q);
    }

    if (cosHalfTheta >= 1.0) {
      return this;
    }

    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta ** 2);
    if (Math.abs(sinHalfTheta) < 0.001) {
      this.w = 0.5 * (this.w + q.w);
      this.x = 0.5 * (this.x + q.x);
      this.y = 0.5 * (this.y + q.y);
      this.z = 0.5 * (this.z + q.z);
      return this;
    }

    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    this.w = ratioA * this.w + ratioB * q.w;
    this.x = ratioA * this.x + ratioB * q.x;
    this.y = ratioA * this.y + ratioB * q.y;
    this.z = ratioA * this.z + ratioB * q.z;

    return this;
  }

  // 复制四元数
  copy(q) {
    this.x = q.x;
    this.y = q.y;
    this.z = q.z;
    this.w = q.w;
    return this;
  }

  // 克隆四元数
  clone() {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }
}

export default Quaternion;