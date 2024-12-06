class Program {
  constructor(gl, vertexShaderSource, fragmentShaderSource) {
    this.gl = gl;

    // 初始化着色器程序
    this.program = this.initShaderProgram(vertexShaderSource, fragmentShaderSource);
    if (!this.program) {
      throw new Error('Failed to create shader program');
    }

    // 存储属性和 uniform 位置信息
    this.attributeLocations = this.collectAttributeLocations();
    this.uniformLocations = this.collectUniformLocations();
  }

  // 初始化着色器程序
  initShaderProgram(vertexSource, fragmentSource) {
    const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentSource);

    if (!vertexShader || !fragmentShader) {
      return null;
    }

    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.checkAndLogError(
      () => this.gl.getProgramParameter(program, this.gl.LINK_STATUS),
      () => this.gl.getProgramInfoLog(program),
      'Failed to link shader program'
    )) {
      return null;
    }

    return program;
  }

  // 通用错误检查和日志记录方法
  checkAndLogError(checkFn, logFn, errorMessage) {
    const result = checkFn();
    if (!result) {
      console.error(errorMessage, logFn());
    }
    return result;
  }

  // 编译着色器
  compileShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.checkAndLogError(
      () => this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS),
      () => this.gl.getShaderInfoLog(shader),
      `Shader compilation error (${type === this.gl.VERTEX_SHADER ? 'vertex' : 'fragment'})`
    )) {
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  // 收集所有属性位置
  collectAttributeLocations() {
    const attributeLocations = {};
    const attributeCount = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES);

    for (let i = 0; i < attributeCount; i++) {
      const attributeInfo = this.gl.getActiveAttrib(this.program, i);
      if (!attributeInfo) continue;

      attributeLocations[attributeInfo.name] = this.gl.getAttribLocation(this.program, attributeInfo.name);
    }

    return attributeLocations;
  }

  // 收集所有 uniform 位置和类型
  collectUniformLocations() {
    const uniformLocations = {};
    const uniformCount = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < uniformCount; i++) {
      const uniformInfo = this.gl.getActiveUniform(this.program, i);
      if (!uniformInfo) continue;

      uniformLocations[uniformInfo.name] = {
        location: this.gl.getUniformLocation(this.program, uniformInfo.name),
        type: uniformInfo.type,
      };
    }

    return uniformLocations;
  }

  // 激活当前程序
  use() {
    this.gl.useProgram(this.program);
  }

  // 绑定顶点属性缓冲区
  bindArrayBuffer(attributeName, dataAttribute) {
    const {
      array,
      itemSize,
      usage = this.gl.STATIC_DRAW,
      normalized = false,
      stride = 0,
      offset = 0,
    } = dataAttribute;

    // 获取属性位置
    const location = this.attributeLocations[attributeName];
    if (location === undefined) {
      // console.warn(`Attribute '${attributeName}' not found in shader program.`);
      return;
    }

    // 初始化缓冲区并绑定
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, array, usage);

    // 配置属性指针
    this.gl.enableVertexAttribArray(location);
    this.gl.vertexAttribPointer(location, itemSize, this.gl.FLOAT, normalized, stride, offset);

    // 解除绑定
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  // 绑定索引缓冲区
  bindElementBuffer(indices) {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
  }

  // 设置所有 Uniform
  setUniforms(uniformMap) {
    for (const [name, { location, type }] of Object.entries(this.uniformLocations)) {
      const value = typeof uniformMap[name] === 'function' 
        ? uniformMap[name]()
        : uniformMap[name];
      
        if (value === undefined) continue;

      this.setUniform(location, type, value);
    }
  }

  // 统一设置 Uniform 的方法
  setUniform(location, type, value) {
    const gl = this.gl;

    switch (type) {
      case gl.FLOAT:
        gl.uniform1f(location, value);
        break;
      case gl.FLOAT_VEC3:
        gl.uniform3fv(location, value);
        break;
      case gl.FLOAT_VEC4:
        gl.uniform4fv(location, value);
        break;
      case gl.FLOAT_MAT4:
        gl.uniformMatrix4fv(location, false, value);
        break;
      case gl.INT:
        gl.uniform1i(location, value);
        break;
      case gl.SAMPLER_2D:
        gl.uniform1i(location, value); // Assuming texture unit is bound
        break;
      default:
        console.warn(`Unsupported uniform type: ${type}`);
    }
  }
}

export default Program;
