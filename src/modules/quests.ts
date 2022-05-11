import stages from "./stages";
import logger from "../components/logger";
import cache from "../conf/cache";

const quests = {
  rootElement: document.querySelector("#quests-progress")!,
  current: document.querySelector("#quest-current")!,
  target: document.querySelector("#quest-target")!,
  completeValue: 0,
  initTarget() {
    const totals = Math.floor(
      (stages.target.TIMER * 1000) / stages.target.SUMMON_SPEED -
        (stages.target.TIMER * 1000) / stages.target.SUMMON_SPEED / 3
    );

    this.completeValue = totals;
    this.target.innerHTML = totals + "";
  },
  update() {
    this.current.innerHTML = cache.props.BREAK_CHARS + "";
    if (cache.props.BREAK_CHARS >= this.completeValue) {
      this.target.innerHTML = "Completed";
    }
  },
  load() {
    this.current.innerHTML = "0";
    this.initTarget();
    this.rootElement.classList.remove("hidden");
    logger("Quests", "载入模块");
  },
  hide() {
    this.rootElement.classList.add("hidden");
    this.current.innerHTML = "";
    this.target.innerHTML = "";
    this.completeValue = 0;
    logger("Quests", "已隐藏");
  },
};

export default quests;
