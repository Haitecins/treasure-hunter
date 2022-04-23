import localstorage from "../utils/localstorage";
import formatter from "../utils/formatter";

const accountObject = {
  info: document.querySelector("#account-info")!,
  balances: {
    copper: document.querySelector("#bal-copper-ingot>div")!,
    iron: document.querySelector("#bal-iron-ingot>div")!,
    gold: document.querySelector("#bal-gold-ingot>div")!,
  },
  update() {
    console.log("Account模块更已更新");
    const { copper, iron, gold } = this.balances;
    const { balances } = localstorage.get();

    this.info.innerHTML = `${localstorage.get().name} / Lv.${
      localstorage.get().levels
    }`;
    copper.innerHTML = formatter(balances.copper, 2);
    iron.innerHTML = formatter(balances.iron, 2);
    gold.innerHTML = formatter(balances.gold, 2);
  },
};

export default accountObject;
