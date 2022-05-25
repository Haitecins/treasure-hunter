import anime from "animejs";
import cache from "../cache";
import logger from "@/components/logger";

const { props: cacheProps } = cache;
const ratings = {
  load(container: Element) {
    const { breakChars } = cacheProps;
    let rank;

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
    cacheProps.copperCount += anime.random(50, 70);
    cacheProps.ironCount += anime.random(15, 30);
    cacheProps.goldCount += anime.random(7, 10);

    return "S";
  },
  rankA() {
    cacheProps.copperCount += anime.random(30, 50);
    cacheProps.ironCount += anime.random(5, 15);
    cacheProps.goldCount += anime.random(5, 7);

    return "A";
  },
  rankB() {
    cacheProps.copperCount += anime.random(10, 30);
    cacheProps.ironCount += anime.random(2, 5);
    cacheProps.goldCount += anime.random(0, 1);

    return "B";
  },
  rankC() {
    cacheProps.copperCount += anime.random(5, 10);
    cacheProps.ironCount += anime.random(1, 2);

    return "C";
  },
  rankD() {
    cacheProps.copperCount += anime.random(0, 5);

    return "D";
  },
};

export default ratings;
