import Matrix4 from '../utils/Matrix4';
import Camera from './Camera';

class PerspectiveCamera extends Camera {
  constructor(fov = 45, aspect = 1, near = 0.1, far = 1000) {
    super();
    this._fov = fov;
    this._aspect = aspect;
    this._near = near;
    this._far = far;
    this._projectionMatrix = new Matrix4().getPerspMatrix(fov, aspect, near, far);
  }

  updateProjectionMatrix() {
    this._projectionMatrix = new Matrix4().getPerspMatrix(
      this._fov,
      this._aspect,
      this._near,
      this._far
    );
  }

  get fov() {
    return this._fov;
  }

  set fov(value) {
    this._fov = value;
    this.updateProjectionMatrix();
  }

  get aspect() {
    return this._aspect;
  }

  set aspect(value) {
    this._aspect = value;
    this.updateProjectionMatrix();
  }

  get near() {
    return this._near;
  }

  set near(value) {
    this._near = value;
    this.updateProjectionMatrix();
  }

  get far() {
    return this._far;
  }

  set far(value) {
    this._far = value;
    this.updateProjectionMatrix();
  }

  get projectionMatrix() {
    return this._projectionMatrix;
  }
}
export default PerspectiveCamera;
