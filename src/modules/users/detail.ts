import logger from "../../components/logger";
import storage from "../storage";
import profile from "./profile";
import anime from "animejs";
import { querySelector } from "../../components/querySelector";

const detail = {
  rootElement: querySelector("#detail-module"),
  closeElement: querySelector("#detail-close"),
  nameElement: querySelector("#detail-name"),
  levelsElement: querySelector("#detail-levels"),
  balanceElement: {
    copper: querySelector("#detail-bal-copper-ingot>div"),
    iron: querySelector("#detail-bal-iron-ingot>div"),
    gold: querySelector("#detail-bal-gold-ingot>div"),
  },
  totalBreaksElement: querySelector("#detail-break-chars>div"),
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

    logger("Detail", "初始化");
    bindElement.addEventListener("click", openHandler);
  },
  update() {
    logger("Detail", "已更新");
    const savedStorage = storage.get();
    const savedBalances = savedStorage.balances;

    this.levelsElement.innerHTML = `${savedStorage.levels} Levels`;
    this.nameElement.innerHTML = savedStorage.name;
    this.balanceElement.copper.innerHTML =
      savedBalances.copper.toLocaleString("en");
    this.balanceElement.iron.innerHTML =
      savedBalances.iron.toLocaleString("en");
    this.balanceElement.gold.innerHTML =
      savedBalances.gold.toLocaleString("en");
    this.totalBreaksElement.innerHTML =
      savedStorage.historyBreak.toLocaleString("en");
  },
  show() {
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 250,
      easing: "easeInOutQuad",
      begin: () => {
        logger("Detail", "正在加载");
        this.rootElement.classList.remove("hidden");
        // 更新状态
        this.update();
      },
      complete() {
        logger("Detail", "载入模块");
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
        logger("Detail", "已隐藏");
      },
    });
  },
};

export default detail;
