import { querySelector } from "@/components/selector";
import logger from "@/components/logger";
import switcher from "@/components/switcher";
import { hideModule, showModule } from "@/components/displaying";

const Store: StoreModuleProps = {
  rootElement: querySelector("#store-module"),
  openElement: querySelector("#treasure-store-open-btn"),
  closeElement: querySelector("#store-close-btn"),
  init() {
    switcher(
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

type StoreModuleProps = {
  readonly rootElement: Element;
  readonly openElement: Element;
  readonly closeElement: Element;
  init(): void;
  show(): void;
  hide(): void;
};

export default Store;
export { StoreModuleProps };
