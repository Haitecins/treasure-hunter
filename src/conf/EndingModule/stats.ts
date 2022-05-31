import cache from "../cache";
import storage from "@/modules/storage";
import ticks from "@/modules/ticks";
import convert from "@/modules/convert";
import logger from "@/components/logger";
import writeText from "@/components/writeText";

const stats: StatPropsType = {
  list: [
    () => {
      const timeRecorder = ticks.timeRecorder;

      // 重置计时
      ticks.reset();

      return `耗时：${writeText(convert(timeRecorder))}`;
    },
    () => {
      const { breakChars } = cache.props;

      logger("Stat", `破坏字块${breakChars}个`);
      storage.save((data) => (data.historyBreak += breakChars));

      return `破坏字块：${writeText(breakChars.toLocaleString("en"))}个`;
    },
  ],
  load(container) {
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

type StatPropsType = {
  readonly list: readonly Function[];
  load(container: Element): void;
};

export default stats;
export { StatPropsType };
