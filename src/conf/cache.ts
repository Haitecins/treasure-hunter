const rootObject = {
  breakCount: 0,
  bal: {
    copperCount: 0,
  },
};
const cache = {
  refs: { ...rootObject },
  reset() {
    this.refs = { ...rootObject };
    console.log("重置Cache模块", this.refs);
  },
};

export default cache;
