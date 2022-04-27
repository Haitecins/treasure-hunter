import cache from "../cache";
import localstorage from "../../utils/localstorage";
import loadIcon from "../../components/loadIcon";
import writeText from "../../components/writeText";

const rewards = {
  list: [
    () => {
      if (cache.props.COPPER_COUNT) {
        localstorage.save(
          (data) => (data.balances.copper += cache.props.COPPER_COUNT)
        );
        return `${loadIcon("bg-bal-copper-ingot")}${writeText(
          cache.props.COPPER_COUNT
        )}`;
      }
      return null;
    },
    () => {
      if (cache.props.IRON_COUNT) {
        localstorage.save(
          (data) => (data.balances.iron += cache.props.IRON_COUNT)
        );
        return `${loadIcon("bg-bal-iron-ingot")}${writeText(
          cache.props.IRON_COUNT
        )}`;
      }
      return null;
    },
    () => {
      if (cache.props.GOLD_COUNT) {
        localstorage.save(
          (data) => (data.balances.gold += cache.props.GOLD_COUNT)
        );
        return `${loadIcon("bg-bal-gold-ingot")}${writeText(
          cache.props.GOLD_COUNT
        )}`;
      }
      return null;
    },
  ],
  load(container: Element) {
    this.list.forEach((reward) => {
      const result = reward();

      if (result) {
        const el = document.createElement("p");

        el.innerHTML = result;
        el.classList.add("th-icon-module");
        container.appendChild(el);
      }
    });
  },
};

export default rewards;
