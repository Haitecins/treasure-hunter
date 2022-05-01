import cache from "../cache";
import anime from "animejs";

const ratings = {
  get() {
    console.log("Ratings模块载入");
    if (cache.props.BREAK_CHARS >= 100) {
      console.log("最终评价为 S");
      return this.rankS();
    } else if (cache.props.BREAK_CHARS >= 75) {
      console.log("最终评价为 A");
      return this.rankA();
    } else if (cache.props.BREAK_CHARS >= 50) {
      console.log("最终评价为 B");
      return this.rankB();
    } else if (cache.props.BREAK_CHARS >= 25) {
      console.log("最终评价为 C");
      return this.rankC();
    } else {
      console.log("最终评价为 D");
      return this.rankD();
    }
  },
  rankS() {
    cache.props.COPPER_COUNT += anime.random(50, 70);
    cache.props.IRON_COUNT += anime.random(15, 30);
    cache.props.GOLD_COUNT += anime.random(7, 10);
    return "S";
  },
  rankA() {
    cache.props.COPPER_COUNT += anime.random(30, 50);
    cache.props.IRON_COUNT += anime.random(5, 15);
    cache.props.GOLD_COUNT += anime.random(5, 7);
    return "A";
  },
  rankB() {
    cache.props.COPPER_COUNT += anime.random(10, 30);
    cache.props.IRON_COUNT += anime.random(2, 5);
    cache.props.GOLD_COUNT += anime.random(0, 1);
    return "B";
  },
  rankC() {
    cache.props.COPPER_COUNT += anime.random(5, 10);
    cache.props.IRON_COUNT += anime.random(1, 2);
    return "C";
  },
  rankD() {
    cache.props.COPPER_COUNT += anime.random(0, 5);
    return "D";
  },
};

export default ratings;
