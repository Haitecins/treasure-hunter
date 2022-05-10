import storage from "../../libs/storage";
import logger from "../../components/logger";
import formatter from "../../utils/formatter";
import query from "../../components/query";

const profile = {
  rootElement: query<Element>("#profile-module")!,
  name: query<Element>("#profile-name")!,
  levels: query<Element>("#profile-levels")!,
  balances: {
    copper: query<Element>("#bal-copper-ingot>div")!,
    iron: query<Element>("#bal-iron-ingot>div")!,
    gold: query<Element>("#bal-gold-ingot>div")!,
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
