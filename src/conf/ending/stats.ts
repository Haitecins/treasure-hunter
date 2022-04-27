import cache from "../cache";
import localstorage from "../../utils/localstorage";
import writeText from "../../components/writeText";
import ticks from "../../modules/ticks";
import convert from "../../utils/convert";

const stats = {
  list: [
    () => {
      const recorder = ticks.recorder;
      // 重置计时
      ticks.reset();
      return `耗时：${writeText(convert(recorder))}`;
    },
    () => {
      localstorage.save((data) => {
        console.log(`统计：破坏字符${cache.props.BREAK_CHARS}个`);
        data.historyBreak += cache.props.BREAK_CHARS;
      });
      return `破坏字符：${writeText(cache.props.BREAK_CHARS)}个`;
    },
  ],
  load(container: Element) {
    console.log("Stats模块加载");
    this.list.forEach((stat) => {
      const result = stat();

      if (result) {
        const el = document.createElement("p");

        el.innerHTML = result;
        container.appendChild(el);
      }
    });
  },
};

export default stats;
