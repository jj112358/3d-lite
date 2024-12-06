import Object3D from '../core/Object3D';

import Matrix4 from '../utils/Matrix4';
import Vector3 from '../utils/Vector3';

class Camera extends Object3D {
  constructor() {
    super();
    this.isCamera = true;
    
    this.target = new Vector3(0, 0, 0);
    this.up = new Vector3(0, 1, 0);
    this._viewMatrix = new Matrix4().getViewMatrix(this.position, this.target, this.up);
  }

  get viewMatrix() {
    return this._viewMatrix;
  }

  // 在lookAt时, 改变相机的视图矩阵
  lookAt(x, y, z) {
    if (x.type === 'Vector3') {
      this.target.copy(x);
    } else {
      this.target.set(x, y, z);
    }
    this._viewMatrix = new Matrix4().getViewMatrix(this.position, this.target, this.up);
  }
}
export default Camera;
