import localstorage from "../../utils/localstorage";
import formatter from "../../utils/formatter";

const profileModule = {
  rootElement: document.querySelector("#profile-module")!,
  levels: document.querySelector("#profile-levels")!,
  name: document.querySelector("#profile-name")!,
  balances: {
    copper: document.querySelector("#bal-copper-ingot>div")!,
    iron: document.querySelector("#bal-iron-ingot>div")!,
    gold: document.querySelector("#bal-gold-ingot>div")!,
  },
  update() {
    console.log("Profile模块已更新");
    const { copper, iron, gold } = this.balances;
    const { balances, name, levels } = localstorage.get();

    this.levels.innerHTML = `Lv.${levels}`;
    this.name.innerHTML = name;
    copper.innerHTML = formatter(balances.copper, 2);
    iron.innerHTML = formatter(balances.iron, 2);
    gold.innerHTML = formatter(balances.gold, 2);
  },
};

export default profileModule;
