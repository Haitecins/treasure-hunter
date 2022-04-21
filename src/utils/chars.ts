const chars = {
  keys: [],
  minCode: 97,
  maxCode: 122,
  random() {
    // ASCII 97(a) - 122(z)
    const code =
      Math.floor(Math.random() * (this.maxCode - this.minCode + 1)) +
      this.minCode;

    return String.fromCharCode(code);
  },
};

export default chars;
