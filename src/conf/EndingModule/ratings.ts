import anime from "animejs";
import cache from "../cache";
import logger from "@/components/logger";
import storage from "@/modules/storage";

const levelsUp = () => {
  logger("Levels", "玩家等级提升");
  storage.save((data) => {
    // 升级
    data.levels += 1;
  });
};
const ratings: RatingModuleMethods = {
  load(container) {
    const { breakChars } = cache.props;
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
    cache.props.copperCount += anime.random(50, 70);
    cache.props.ironCount += anime.random(15, 30);
    cache.props.goldCount += anime.random(7, 10);
    if (anime.random(0, 100) <= 60) {
      levelsUp();
    }

    return "S";
  },
  rankA() {
    cache.props.copperCount += anime.random(30, 50);
    cache.props.ironCount += anime.random(5, 15);
    cache.props.goldCount += anime.random(5, 7);
    if (anime.random(0, 100) <= 40) {
      levelsUp();
    }

    return "A";
  },
  rankB() {
    cache.props.copperCount += anime.random(10, 30);
    cache.props.ironCount += anime.random(2, 5);
    cache.props.goldCount += anime.random(0, 1);
    if (anime.random(0, 100) <= 25) {
      levelsUp();
    }

    return "B";
  },
  rankC() {
    cache.props.copperCount += anime.random(5, 10);
    cache.props.ironCount += anime.random(1, 2);
    if (anime.random(0, 100) <= 15) {
      levelsUp();
    }

    return "C";
  },
  rankD() {
    cache.props.copperCount += anime.random(0, 5);
    if (anime.random(0, 100) <= 10) {
      levelsUp();
    }

    return "D";
  },
};

type RankList = "S" | "A" | "B" | "C" | "D";
type RatingModuleMethods = {
  load(container: Element): void;
  rankS(): RankList;
  rankA(): RankList;
  rankB(): RankList;
  rankC(): RankList;
  rankD(): RankList;
};

export default ratings;
export { RankList, RatingModuleMethods };
