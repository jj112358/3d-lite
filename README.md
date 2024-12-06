# 3D-lite

## 项目简介

这是一个非常轻量级的3D渲染引擎, 参考Threejs设计。没有考虑性能优化，仅供教学和理解WebGL的基本原理。

## 功能特性

- 创建和渲染 3D 场景
- 支持透视相机
- 可以添加不同类型的几何体（立方体、球体）
- 多种材质支持（基本材质、法线材质、Phong 材质）
- 支持环境光和点光源
- 使用 OrbitControls 进行场景控制

## 安装步骤

1. 克隆此仓库：
   ```bash
   git clone https://github.com/jj112358/3d-lite
   cd 3d-lite
   ```

2. 安装所需依赖：
   ```bash
   pnpm install
   ```

3. 启动项目：
   ```bash
   pnpm dev
   ```

4. 在浏览器中打开 `http://localhost:5173`（默认端口，具体视项目配置而定）。

## 使用方法

- 使用鼠标拖动来旋转场景。
- 鼠标滚轮可以改变视角距离。

## 贡献

欢迎任何形式的贡献！如果您有建议或问题，请随时提交 issue 或 pull request。

## 许可证

本项目使用 MIT 许可证，详细信息请参见 [LICENSE](LICENSE) 文件。
