import { querySelector } from "@/components/querySelector";
import logger from "@/components/logger";
import moduleToggle from "@/components/moduleToggle";
import { hideModule, showModule } from "@/components/moduleDisplay";

const Store = {
  rootElement: querySelector("#store-module"),
  openElement: querySelector("#treasure-store-open-btn"),
  closeElement: querySelector("#store-close-btn"),
  init() {
    moduleToggle(
      {
        open: this.openElement,
        close: this.closeElement,
      },
      () => this.show(),
      () => this.hide()
    );
    logger("Store", "初始化");
  },
  show() {
    showModule(this.rootElement, "Store");
  },
  hide() {
    hideModule(this.rootElement, "Store");
  },
};

export default Store;
