import cache from "../cache";

const ratings = {
  get() {
    if (cache.props.BREAK_CHARS >= 100) {
      return this.S();
    } else if (cache.props.BREAK_CHARS >= 75) {
      return this.A();
    } else if (cache.props.BREAK_CHARS >= 50) {
      return this.B();
    } else if (cache.props.BREAK_CHARS >= 25) {
      return this.C();
    } else {
      return this.D();
    }
  },
  S() {
    cache.props.COPPER_COUNT += 70;
    cache.props.IRON_COUNT += 30;
    cache.props.GOLD_COUNT += 15;
    return "S";
  },
  A() {
    cache.props.COPPER_COUNT += 50;
    cache.props.IRON_COUNT += 15;
    cache.props.GOLD_COUNT += 7;
    return "A";
  },
  B() {
    cache.props.COPPER_COUNT += 20;
    cache.props.IRON_COUNT += 5;
    cache.props.GOLD_COUNT += 1;
    return "B";
  },
  C() {
    cache.props.COPPER_COUNT += 10;
    cache.props.IRON_COUNT += 2;
    return "C";
  },
  D() {
    cache.props.COPPER_COUNT += 5;
    return "D";
  },
};

export default ratings;
