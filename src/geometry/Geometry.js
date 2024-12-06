class Geometry {
  constructor() {
    this.type = 'Geometry';

    this.attributes = {};
  }
  setAttribute(name, attribute) {
    this.attributes[name] = attribute;
  }
  getAttribute(name) {
    return this.attributes[name];
  }
  hasAttribute(name) {
    return this.attributes.hasOwnProperty(name);
  }
}

export default Geometry;
