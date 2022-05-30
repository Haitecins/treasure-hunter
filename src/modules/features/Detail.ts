import { Profile } from "../users";
import storage from "../storage";
import { querySelector } from "@/components/selector";
import logger from "@/components/logger";
import switcher from "@/components/switcher";
import { hideModule, showModule } from "@/components/displaying";

const Detail: DetailModuleProps = {
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
    switcher(
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
    showModule(this.rootElement, "Detail", {
      begin: () => this.updateStatus(),
    });
  },
  hide() {
    hideModule(this.rootElement, "Detail");
  },
};

type DetailModuleProps = {
  readonly rootElement: Element;
  readonly closeElement: Element;
  readonly nameElement: Element;
  readonly levelsElement: Element;
  readonly balanceElement: {
    readonly copper: Element;
    readonly iron: Element;
    readonly gold: Element;
  };
  readonly totalBreaksElement: Element;
  init(): void;
  updateStatus(): void;
  show(): void;
  hide(): void;
};

export default Detail;
export { DetailModuleProps };
