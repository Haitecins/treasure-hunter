import logger from "@/components/logger";
import { querySelector } from "@/components/querySelector";
import resolutionItem from "@/conf/SettingsModule/resolutionItem";
import moduleToggle from "@/components/moduleToggle";
import { hideModule, showModule } from "@/components/moduleDisplay";

const Settings = {
  rootElement: querySelector("#settings-module"),
  openElement: querySelector("#settings-open-btn"),
  closeElement: querySelector("#settings-close-btn"),
  options: {
    // 分辨率设置
    resolution: <HTMLInputElement>querySelector("#resolution-option"),
  },
  init() {
    moduleToggle(
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
  hide(beginExtraCallback?: () => void) {
    hideModule(this.rootElement, "Settings", {
      begin: beginExtraCallback,
    });
  },
};

export default Settings;
