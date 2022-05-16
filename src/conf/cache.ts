import logger from "../components/logger";

const provides = {
  // 破坏的字块数
  BREAK_CHARS: 0,
  // 铜锭计数
  COPPER_COUNT: 0,
  // 铁锭计数
  IRON_COUNT: 0,
  // 金锭计数
  GOLD_COUNT: 0,
};
const cache = {
  provides: { ...provides },
  reset() {
    this.provides = { ...provides };
    logger("Cache", "重置缓存");
  },
};

export default cache;
