import Camera from './Camera';
import Matrix4 from '../utils/Matrix4';

class OrthographicCamera extends Camera {
  constructor(left, right, top, bottom, near, far) {
    super();
    this.type = 'OrthographicCamera';

    this._left = left;
    this._right = right;
    this._top = top;
    this._bottom = bottom;
    this._near = near;
    this._far = far;
    this._projectionMatrix = new Matrix4().getOrthoMatrix(left, right, top, bottom, near, far);
  }

  updateProjectionMatrix() {
    this._projectionMatrix = new Matrix4().getOrthoMatrix(
      this._left,
      this._right,
      this._top,
      this._bottom,
      this._near,
      this._far
    );
  }
  get left() {
    return this._left;
  }
  set left(value) {
    this._left = value;
    this.updateProjectionMatrix();
  }
  get right() {
    return this._right;
  }
  set right(value) {
    this._right = value;
    this.updateProjectionMatrix();
  }
  get top() {
    return this._top;
  }
  set top(value) {
    this._top = value;
    this.updateProjectionMatrix();
  }
  get bottom() {
    return this._bottom;
  }
  set bottom(value) {
    this._bottom = value;
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
export default OrthographicCamera;
