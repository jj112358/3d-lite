class BufferAttribute {
  constructor(attribute, array, itemSize, normalized = false) {
    if (!array.BYTES_PER_ELEMENT) {
      throw new Error('array must be a TypedArray');
    }

    this.attribute = attribute;
    this.array = array;
    this.itemSize = itemSize;
    this.normalized = normalized;
  }

  get count() {
    const length = this.array.length;

    return this.stride ? length / this.stride : length / this.itemSize;
  }
}

export default BufferAttribute;
