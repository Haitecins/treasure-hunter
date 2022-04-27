import localstorage from "../../utils/localstorage";
import cache from "../cache";

const writeText = (text: any) => {
  return `<span class="text-th-info">${text}</span>`;
};

const stats = {
  list: [
    () => {
      localstorage.save(
        (data) => (data.historyBreak += cache.props.BREAK_CHARS)
      );
      return `破坏字符：${writeText(cache.props.BREAK_CHARS)}个`;
    },
  ],
  load(container: Element) {
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
