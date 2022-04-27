const props = {
  BREAK_CHARS: 0,
  COPPER_COUNT: 0,
  IRON_COUNT: 0,
  GOLD_COUNT: 0,
};
const cache = {
  props: { ...props },
  reset() {
    this.props = { ...props };
    console.log("重置Cache模块", this.props);
  },
};

export default cache;
