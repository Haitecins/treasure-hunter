import logger from "@/components/logger";
import { querySelector } from "@/components/selector";
import resolutionItem from "@/conf/SettingsModule/resolutionItem";
import switcher from "@/components/switcher";
import { hideModule, showModule } from "@/components/displaying";
import { ModuleToggleType, RootElementType } from "@/global-types";

const Settings: SettingsPropsType = {
  rootElement: querySelector("#settings-module"),
  openElement: querySelector("#settings-open-btn"),
  closeElement: querySelector("#settings-close-btn"),
  options: {
    // 分辨率设置
    resolution: <HTMLInputElement>querySelector("#resolution-option"),
  },
  init() {
    switcher(
      {
        open: this.openElement,
        close: this.closeElement,
      },
      () => this.show(),
      () =>
        this.hide(() => {
          // 应用分辨率设置
          resolutionItem.save();
        })
    );
    logger("Settings", "初始化");
    // 初始化分辨率设置选项
    resolutionItem.init();
  },
  show() {
    showModule(this.rootElement, "Settings");
  },
  hide(beginExtraCallback) {
    hideModule(this.rootElement, "Settings", {
      begin: beginExtraCallback,
    });
  },
};

type SettingsMethodsType = {
  init(): void;
  show(): void;
  hide(beginExtraCallback?: () => void): void;
};
type ExtendsType = SettingsMethodsType & RootElementType & ModuleToggleType;

interface SettingsPropsType extends ExtendsType {
  readonly options: {
    readonly resolution: HTMLInputElement;
  };
}

export default Settings;
export { SettingsPropsType };
