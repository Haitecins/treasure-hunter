import localstorage from "../utils/localstorage";

const accountObject = {
  info: document.querySelector("#account-info")!,
  balances: {
    copper: document.querySelector("#bal-copper-ingot>div")!,
    iron: document.querySelector("#bal-iron-ingot>div")!,
    gold: document.querySelector("#bal-gold-ingot>div")!,
  },
  update() {
    import.meta.env.DEV && console.log("Account模块更已更新");
    const { copper, iron, gold } = this.balances;

    this.info.innerHTML = `${localstorage.get().name} / Lv.${
      localstorage.get().levels
    }`;
    copper.innerHTML = localstorage.get().balances.copper + "";
    iron.innerHTML = localstorage.get().balances.iron + "";
    gold.innerHTML = localstorage.get().balances.gold + "";
  },
};

export default accountObject;
