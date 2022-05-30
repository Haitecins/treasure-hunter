import logger from "@/components/logger";
import { querySelector } from "@/components/selector";
import resolutionItem from "@/conf/SettingsModule/resolutionItem";
import switcher from "@/components/switcher";
import { hideModule, showModule } from "@/components/displaying";

const Settings: SettingsModuleProps = {
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

type SettingsModuleProps = {
  readonly rootElement: Element;
  readonly openElement: Element;
  readonly closeElement: Element;
  readonly options: {
    readonly resolution: HTMLInputElement;
  };
  init(): void;
  show(): void;
  hide(beginExtraCallback?: () => void): void;
};

export default Settings;
export { SettingsModuleProps };
