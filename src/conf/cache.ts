import logger from "@/components/logger";

const provides = {
  // 游戏是否正在进行中
  isPlaying: false,
  // 破坏的字块数
  breakChars: 0,
  // 铜锭计数
  copperCount: 0,
  // 铁锭计数xw
  ironCount: 0,
  // 金锭计数
  goldCount: 0,
};
const cache = {
  props: { ...provides },
  reset() {
    this.props = { ...provides };
    logger("Cache", "重置缓存");
  },
};

export default cache;
