import Vector3 from '../utils/Vector3';
import Euler from '../utils/Euler';
import Matrix4 from '../utils/Matrix4';

class Object3D {
  constructor() {
    this.position = new Vector3(0, 0, 0); // 位置
    this.rotation = new Euler(0, 0, 0); // 欧拉角表示的旋转
    this.scale = new Vector3(1, 1, 1); // 缩放
    this.localMatrix = new Matrix4(); // 本地模型矩阵
    this.worldMatrix = new Matrix4(); // 世界矩阵
    this.parent = null; // 父对象
    this.children = []; // 子对象
    this.matrixNeedsUpdate = true; // 是否需要更新矩阵
  }

  // 更新本地矩阵
  updateLocalMatrix() {
    this.localMatrix.compose(
      this.position,
      this.rotation.toQuaternion(),
      this.scale
    );
    this.matrixNeedsUpdate = true;
  }

  // 递归更新世界矩阵
  updateWorldMatrix(forceUpdate = false) {
    if (this.matrixNeedsUpdate || forceUpdate) {
      this.updateLocalMatrix();
    }

    if (this.parent) {
      this.worldMatrix.multiplyMatrices(
        this.parent.worldMatrix,
        this.localMatrix
      );
    } else {
      this.worldMatrix.copy(this.localMatrix);
    }

    for (const child of this.children) {
      child.updateWorldMatrix(forceUpdate);
    }

    this.matrixNeedsUpdate = false;
  }

  // 添加子对象
  add(child) {
    if (child.parent) {
      child.parent.remove(child);
    }
    child.parent = this;
    this.children.push(child);
  }

  // 移除子对象
  remove(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }
  }

  // 遍历当前对象及所有子对象
  traverse(callback) {
    // 执行回调
    callback(this);

    // 递归调用子对象
    for (const child of this.children) {
      child.traverse(callback);
    }
  }
}

export default Object3D;
