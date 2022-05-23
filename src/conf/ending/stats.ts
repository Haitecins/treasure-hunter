import cache from "../cache";
import storage from "../../modules/storage";
import writeText from "../../components/writeText";
import ticks from "../../modules/ticks";
import convert from "../../modules/convert";
import logger from "../../components/logger";

const stats = {
  list: [
    () => {
      const timeRecorder = ticks.timeRecorder;

      // 重置计时
      ticks.reset();

      return `耗时：${writeText(convert(timeRecorder))}`;
    },
    () => {
      const breakChars = cache.provides.BREAK_CHARS;

      logger("Stat", `破坏字块${breakChars}个`);
      storage.save((data) => (data.historyBreak += breakChars));

      return `破坏字块：${writeText(breakChars.toLocaleString("en"))}个`;
    },
  ],
  load(container: Element) {
    console.group("Stats Module Event");
    logger("Stats", "载入模块");
    this.list.forEach((fillStats) => {
      const fill = fillStats();

      if (fill) {
        const el = document.createElement("p");

        el.innerHTML = fill;
        container.appendChild(el);
      }
    });
    console.groupEnd();
  },
};

export default stats;
