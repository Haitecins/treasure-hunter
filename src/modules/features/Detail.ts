import anime from "animejs";
import { Profile } from "../users";
import storage from "../storage";
import { querySelector } from "@/components/querySelector";
import logger from "@/components/logger";
import moduleToggle from "@/components/moduleToggle";

const Detail = {
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
    moduleToggle(
      {
        open: <HTMLDivElement>Profile.name.parentNode,
        close: this.closeElement,
      },
      () => this.show(),
      () => this.hide()
    );
    logger("Detail", "初始化");
  },
  updateStatus() {
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
        this.updateStatus();
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

export default Detail;
