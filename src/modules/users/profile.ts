import storage from "../../libs/storage";
import logger from "../../components/logger";
import formatter from "../../utils/formatter";

const profile = {
  rootElement: document.querySelector("#profile-module")!,
  name: document.querySelector("#profile-name")!,
  levels: document.querySelector("#profile-levels")!,
  balances: {
    copper: document.querySelector("#bal-copper-ingot>div")!,
    iron: document.querySelector("#bal-iron-ingot>div")!,
    gold: document.querySelector("#bal-gold-ingot>div")!,
  },
  update() {
    logger("Profile", "已更新");
    const { copper, iron, gold } = this.balances;
    const { balances, name, levels } = storage.get();
    const convertFormat = (x: number): string => {
      if (x >= 1e6) {
        return formatter(x, 2);
      } else {
        return x.toLocaleString("en");
      }
    };

    this.levels.innerHTML = `Lv.${levels}`;
    this.name.innerHTML = name;
    copper.innerHTML = convertFormat(balances.copper);
    iron.innerHTML = convertFormat(balances.iron);
    gold.innerHTML = convertFormat(balances.gold);
  },
};

export default profile;
