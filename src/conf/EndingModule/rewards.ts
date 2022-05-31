import cache from "../cache";
import storage from "@/modules/storage";
import loadIcon from "@/components/loadIcon";
import writeText from "@/components/writeText";
import logger from "@/components/logger";

const rewards: RewardPropsType = {
  list: [
    () => {
      const coins = cache.props.copperCount;

      if (coins) {
        storage.save(({ balances }) => (balances.copper += coins));
        logger("Reward", `Give 铜锭x${coins}.`);

        return `${loadIcon("bg-copper_ingot")}${writeText(
          coins.toLocaleString("en")
        )}`;
      }

      return null;
    },
    () => {
      const coins = cache.props.ironCount;

      if (coins) {
        storage.save(({ balances }) => (balances.iron = coins));
        logger("Reward", `Give 铁锭x${coins}.`);

        return `${loadIcon("bg-iron_ingot")}${writeText(
          coins.toLocaleString("en")
        )}`;
      }

      return null;
    },
    () => {
      const coins = cache.props.goldCount;

      if (coins) {
        storage.save(({ balances }) => (balances.gold += coins));
        logger("Reward", `Give 金锭x${coins}.`);

        return `${loadIcon("bg-gold_ingot")}${writeText(
          coins.toLocaleString("en")
        )}`;
      }

      return null;
    },
  ],
  load(container) {
    console.group("Rewards Module Event");
    logger("Rewards", "载入模块");
    this.list.forEach((fillRewards) => {
      const fill = fillRewards();

      if (fill) {
        const el = document.createElement("p");

        el.innerHTML = fill;
        el.classList.add("th-icon-module");
        container.appendChild(el);
      }
    });
    console.groupEnd();
  },
};

type RewardPropsType = {
  readonly list: readonly Function[];
  load(container: Element): void;
};

export default rewards;
export { RewardPropsType };
