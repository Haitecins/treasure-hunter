import cache from "../cache";
import localstorage from "../../utils/localstorage";
import writeText from "../../components/writeText";
import ticks from "../../modules/ticks";
import convert from "../../utils/convert";
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
      localstorage.save((data) => {
        logger("Stat", `破坏字符${cache.props.BREAK_CHARS}个`);
        data.historyBreak += cache.props.BREAK_CHARS;
      });
      return `破坏字符：${writeText(cache.props.BREAK_CHARS)}个`;
    },
  ],
  load(container: Element) {
    console.group("Stats Module Event");
    logger("Stats", "载入模块");
    this.list.forEach((stat) => {
      const result = stat();

      if (result) {
        const el = document.createElement("p");

        el.innerHTML = result;
        container.appendChild(el);
      }
    });
    console.groupEnd();
  },
};

export default stats;
