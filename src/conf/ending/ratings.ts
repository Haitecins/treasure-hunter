import cache from "../cache";
import anime from "animejs";
import logger from "../../components/logger";

const ratings = {
  get() {
    console.group("Ratings Module Event");
    logger("Ratings", "载入模块");
    let result;

    if (cache.props.BREAK_CHARS >= 100) {
      logger("Rating", "Result: S");
      result = this.rankS();
    } else if (cache.props.BREAK_CHARS >= 75) {
      logger("Rating", "Result: A");
      result = this.rankA();
    } else if (cache.props.BREAK_CHARS >= 50) {
      logger("Rating", "Result: B");
      result = this.rankB();
    } else if (cache.props.BREAK_CHARS >= 25) {
      logger("Rating", "Result: C");
      result = this.rankC();
    } else {
      logger("Rating", "Result: D");
      result = this.rankD();
    }
    console.groupEnd();
    return result;
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
