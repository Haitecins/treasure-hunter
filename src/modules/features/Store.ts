import { querySelector } from "@/components/selector";
import logger from "@/components/logger";
import toggleModule from "@/components/toggleModule";
import { hideModule, showModule } from "@/components/displaying";
import { ModuleToggleType, RootElementType } from "@/interfaces";

const Store: StoreModuleProps = {
  rootElement: querySelector("#store-module"),
  openElement: querySelector("#treasure-store-open-btn"),
  closeElement: querySelector("#store-close-btn"),
  init() {
    toggleModule(
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

type StoreModuleMethods = {
  init(): void;
  show(): void;
  hide(): void;
};
type InterfaceExtends = StoreModuleMethods & RootElementType & ModuleToggleType;

interface StoreModuleProps extends InterfaceExtends {}

export default Store;
export { StoreModuleProps };
