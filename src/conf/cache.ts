const props = {
  // 游戏进行中?
  IS_PLAYING: false,
  // 破坏的字符数
  BREAK_CHARS: 0,
  // 铜锭计数
  COPPER_COUNT: 0,
  // 铁锭计数
  IRON_COUNT: 0,
  // 金锭计数
  GOLD_COUNT: 0,
};
const cache = {
  props: { ...props },
  reset() {
    this.props = { ...props };
    console.log("重置Cache模块");
  },
};

export default cache;
