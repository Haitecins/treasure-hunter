import writeText from "../../components/writeText";
import localstorage from "../../utils/localstorage";
import cache from "../cache";

const stats = {
  list: [
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
