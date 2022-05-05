import logger from "../../components/logger";
import storage from "../../libs/storage";
import profile from "./profile";
import anime from "animejs";

const personal = {
  rootElement: document.querySelector("#personal-module")!,
  closeElement: document.querySelector("#personal-close")!,
  name: document.querySelector("#personal-name")!,
  levels: document.querySelector("#personal-levels")!,
  balances: {
    copper: document.querySelector("#personal-bal-copper-ingot>div")!,
    iron: document.querySelector("#personal-bal-iron-ingot>div")!,
    gold: document.querySelector("#personal-bal-gold-ingot>div")!,
  },
  totalBreaks: document.querySelector("#personal-break-chars>div")!,
  init() {
    const bindElement = <HTMLDivElement>profile.name.parentNode;
    const openHandler = () => {
      bindElement.removeEventListener("click", openHandler);
      this.closeElement.addEventListener("click", closeHandler);
      this.show();
    };
    const closeHandler = () => {
      this.closeElement.removeEventListener("click", closeHandler);
      bindElement.addEventListener("click", openHandler);
      this.hide();
    };

    logger("Personal", "初始化");
    bindElement.addEventListener("click", openHandler);
  },
  update() {
    logger("Personal", "已更新");
    const { balances, name, levels, historyBreak } = storage.get();

    this.levels.innerHTML = `${levels} Levels`;
    this.name.innerHTML = name;
    this.balances.copper.innerHTML = balances.copper.toLocaleString("en");
    this.balances.iron.innerHTML = balances.iron.toLocaleString("en");
    this.balances.gold.innerHTML = balances.gold.toLocaleString("en");
    this.totalBreaks.innerHTML = historyBreak.toLocaleString("en");
  },
  show() {
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 250,
      easing: "easeInOutQuad",
      begin: () => {
        logger("Personal", "正在加载");
        this.rootElement.classList.remove("hidden");
        // 更新状态
        this.update();
      },
      complete() {
        logger("Personal", "载入模块");
      },
    });
  },
  hide() {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 250,
      easing: "easeInOutQuad",
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Personal", "已隐藏");
      },
    });
  },
};

export default personal;
