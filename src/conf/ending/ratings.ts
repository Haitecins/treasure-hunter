import cache from "../cache";

const ratings = {
  get() {
    console.log("Ratings模块载入");
    if (cache.props.BREAK_CHARS >= 100) {
      return this.rankS();
    } else if (cache.props.BREAK_CHARS >= 75) {
      return this.rankA();
    } else if (cache.props.BREAK_CHARS >= 50) {
      return this.rankB();
    } else if (cache.props.BREAK_CHARS >= 25) {
      return this.rankC();
    } else {
      return this.rankD();
    }
  },
  rankS() {
    cache.props.COPPER_COUNT += 70;
    cache.props.IRON_COUNT += 30;
    cache.props.GOLD_COUNT += 15;
    return "S";
  },
  rankA() {
    cache.props.COPPER_COUNT += 50;
    cache.props.IRON_COUNT += 15;
    cache.props.GOLD_COUNT += 7;
    return "A";
  },
  rankB() {
    cache.props.COPPER_COUNT += 20;
    cache.props.IRON_COUNT += 5;
    cache.props.GOLD_COUNT += 1;
    return "B";
  },
  rankC() {
    cache.props.COPPER_COUNT += 10;
    cache.props.IRON_COUNT += 2;
    return "C";
  },
  rankD() {
    cache.props.COPPER_COUNT += 5;
    return "D";
  },
};

export default ratings;
