import { querySelector } from "@/components/selector";
import logger from "@/components/logger";
import switcher from "@/components/switcher";
import { hideModule, showModule } from "@/components/displaying";
import { ModuleToggleType, RootElementType } from "@/global-types";

const Store: StorePropsType = {
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

type StoreMethodsType = {
  init(): void;
  show(): void;
  hide(): void;
};
type ExtendsType = StoreMethodsType & RootElementType & ModuleToggleType;

interface StorePropsType extends ExtendsType {}

export default Store;
export { StorePropsType };
