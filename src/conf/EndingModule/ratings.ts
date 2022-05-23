import cache from "../cache";
import anime from "animejs";
import logger from "../../components/logger";

const { provides } = cache;
const ratings = {
  load(container: Element) {
    let rank;
    const breakChars = cache.provides.BREAK_CHARS;

    console.group("Ratings Module Event");
    logger("Ratings", "载入模块");
    if (breakChars >= 100) {
      logger("Rating", "Result: S");
      rank = this.rankS();
    } else if (breakChars >= 75) {
      logger("Rating", "Result: A");
      rank = this.rankA();
    } else if (breakChars >= 50) {
      logger("Rating", "Result: B");
      rank = this.rankB();
    } else if (breakChars >= 25) {
      logger("Rating", "Result: C");
      rank = this.rankC();
    } else {
      logger("Rating", "Result: D");
      rank = this.rankD();
    }
    console.groupEnd();

    container.innerHTML = rank;
  },
  rankS() {
    provides.COPPER_COUNT += anime.random(50, 70);
    provides.IRON_COUNT += anime.random(15, 30);
    provides.GOLD_COUNT += anime.random(7, 10);

    return "S";
  },
  rankA() {
    provides.COPPER_COUNT += anime.random(30, 50);
    provides.IRON_COUNT += anime.random(5, 15);
    provides.GOLD_COUNT += anime.random(5, 7);

    return "A";
  },
  rankB() {
    provides.COPPER_COUNT += anime.random(10, 30);
    provides.IRON_COUNT += anime.random(2, 5);
    provides.GOLD_COUNT += anime.random(0, 1);

    return "B";
  },
  rankC() {
    provides.COPPER_COUNT += anime.random(5, 10);
    provides.IRON_COUNT += anime.random(1, 2);

    return "C";
  },
  rankD() {
    provides.COPPER_COUNT += anime.random(0, 5);

    return "D";
  },
};

export default ratings;
