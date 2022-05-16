import storage from "../storage";
import logger from "../../components/logger";
import formatter from "../../utils/formatter";
import { querySelector } from "../../components/querySelector";

const profile = {
  rootElement: querySelector("#profile-module"),
  name: querySelector("#profile-name"),
  levels: querySelector("#profile-levels"),
  balancesElement: {
    copper: querySelector("#bal-copper-ingot>div"),
    iron: querySelector("#bal-iron-ingot>div"),
    gold: querySelector("#bal-gold-ingot>div"),
  },
  update() {
    logger("Profile", "已更新");
    const savedStorage = storage.get();
    const savedBalances = storage.get().balances;
    const convertFormat = (x: number): string => {
      if (x >= 1e6) {
        return formatter(x, 2);
      } else {
        return x.toLocaleString("en");
      }
    };

    this.levels.innerHTML = `Lv.${savedStorage.levels}`;
    this.name.innerHTML = savedStorage.name;
    this.balancesElement.copper.innerHTML = convertFormat(savedBalances.copper);
    this.balancesElement.iron.innerHTML = convertFormat(savedBalances.iron);
    this.balancesElement.gold.innerHTML = convertFormat(savedBalances.gold);
  },
};

export default profile;
