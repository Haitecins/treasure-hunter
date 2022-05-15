import difficult from "./difficult";
import logger from "../components/logger";
import cache from "../conf/cache";

const quests = {
  rootElement: document.querySelector("#quests-progress")!,
  currentElement: document.querySelector("#quest-current")!,
  targetElement: document.querySelector("#quest-target")!,
  targetValue: 0,
  init() {
    const value = Math.floor(
      (difficult.target.TIMER * 1000) / difficult.target.SUMMON_SPEED -
        (difficult.target.TIMER * 1000) / difficult.target.SUMMON_SPEED / 3
    );

    this.targetValue = value;
    this.currentElement.innerHTML = "0";
    this.targetElement.innerHTML = value + "";
  },
  update() {
    // 增加一次字块计数，并将数值写到current元素中。
    this.currentElement.innerHTML = ++cache.props.BREAK_CHARS + "";
    if (cache.props.BREAK_CHARS >= this.targetValue) {
      this.targetElement.innerHTML = "Completed";
    }
  },
  load() {
    this.init();
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
