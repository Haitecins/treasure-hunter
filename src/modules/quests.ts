import logger from "../components/logger";
import cache from "../conf/cache";
import { Difficult } from "./features";
import { querySelector } from "../components/querySelector";

const quests = {
  rootElement: querySelector("#quests-progress"),
  currentElement: querySelector("#quest-current"),
  targetElement: querySelector("#quest-target"),
  targetValue: 0,
  init() {
    const { target } = Difficult;
    const value = Math.floor(
      (target.TIMER * 1000) / target.SUMMON_SPEED -
        (target.TIMER * 1000) / target.SUMMON_SPEED / 3
    );

    this.targetValue = value;
    this.currentElement.innerHTML = "0";
    this.targetElement.innerHTML = value + "";
  },
  updateTarget() {
    // 增加一次字块计数，并将数值写到current元素中。
    this.currentElement.innerHTML = ++cache.provides.BREAK_CHARS + "";
    if (cache.provides.BREAK_CHARS >= this.targetValue) {
      this.targetElement.innerHTML = "Completed";
    }
  },
  load() {
    // 初始化
    this.init();
    // 显示目标元素
    this.rootElement.classList.remove("hidden");
    logger("Quests", "载入模块");
  },
  hide() {
    this.rootElement.classList.add("hidden");
    this.currentElement.innerHTML = "";
    this.targetElement.innerHTML = "";
    this.targetValue = 0;
    logger("Quests", "已隐藏");
  },
};

export default quests;
