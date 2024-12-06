import Vector3 from './Vector3';

class OrbitControls {
  constructor(object, domElement) {
      // 保存相机对象
      this.object = object;

      // 保存渲染画布
      this.domElement = domElement;

      // 相机的注视点坐标
      this.target = new Vector3();

      // 根据相机初始的位置计算球体的半径
      this.radius = this.getDistance();

      // 记录相机在水平垂直方向的角度
      this.rotationH = Math.atan2(this.object.position.x, this.object.position.z);
      this.rotationV = Math.acos(this.object.position.y / this.radius);

      // 记录鼠标是否按下
      this.isMouseDown = false;

      // 处理鼠标事件
      this.handleMouseEvent();
  }

  update() {
      // 使相机始终注视目标点
      this.object.lookAt(this.target);
  }

  getDistance() {
      return this.object.position.distanceTo(this.target);
  }

  handleMouseEvent() {
      this.domElement.addEventListener('mousedown', () => {
          this.isMouseDown = true;
      });

      this.domElement.addEventListener('mouseup', () => {
          this.isMouseDown = false;
      });

      this.domElement.addEventListener('mousemove', (event) => {
          if (!this.isMouseDown) return;

          // 计算相机在水平垂直方向的角度
          this.rotationH -= event.movementX * 1 / 180 * Math.PI;
          this.rotationV -= event.movementY * 1 / 180 * Math.PI;

          // 将相机在垂直方向的角度限制在0-180度之内
          if (this.rotationV < 1 / 180 * Math.PI) {
              this.rotationV = 1 / 180 * Math.PI;
          }
          if (this.rotationV > Math.PI - 1 / 180 * Math.PI) {
              this.rotationV = Math.PI - 1 / 180 * Math.PI;
          }

          // 设置新的相机位置
          this.object.position.set(
              this.radius * Math.sin(this.rotationV) * Math.sin(this.rotationH),
              this.radius * Math.cos(this.rotationV),
              this.radius * Math.sin(this.rotationV) * Math.cos(this.rotationH)
          );

      });
  }
}

export default OrbitControls;
