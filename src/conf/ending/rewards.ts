import cache from "../cache";
import localstorage from "../../utils/localstorage";
import loadIcon from "../../components/loadIcon";
import writeText from "../../components/writeText";
import logger from "../../components/logger";

const rewards = {
  list: [
    () => {
      if (cache.props.COPPER_COUNT) {
        localstorage.save((data) => {
          logger("Reward", `Give 铜锭x${cache.props.COPPER_COUNT}.`);
          data.balances.copper += cache.props.COPPER_COUNT;
        });
        return `${loadIcon("bg-bal-copper-ingot")}${writeText(
          cache.props.COPPER_COUNT
        )}`;
      }
      return null;
    },
    () => {
      if (cache.props.IRON_COUNT) {
        localstorage.save((data) => {
          logger("Reward", `Give 铁锭x${cache.props.IRON_COUNT}.`);
          data.balances.iron += cache.props.IRON_COUNT;
        });
        return `${loadIcon("bg-bal-iron-ingot")}${writeText(
          cache.props.IRON_COUNT
        )}`;
      }
      return null;
    },
    () => {
      if (cache.props.GOLD_COUNT) {
        localstorage.save((data) => {
          logger("Reward", `Give 金锭x${cache.props.GOLD_COUNT}.`);
          data.balances.gold += cache.props.GOLD_COUNT;
        });
        return `${loadIcon("bg-bal-gold-ingot")}${writeText(
          cache.props.GOLD_COUNT
        )}`;
      }
      return null;
    },
  ],
  load(container: Element) {
    console.group("Rewards Module Event");
    logger("Rewards", "载入模块");
    this.list.forEach((reward) => {
      const result = reward();

      if (result) {
        const el = document.createElement("p");

        el.innerHTML = result;
        el.classList.add("th-icon-module");
        container.appendChild(el);
      }
    });
    console.groupEnd();
  },
};

export default rewards;
