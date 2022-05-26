import anime from "animejs";
import logger from "@/components/logger";
import { querySelector } from "@/components/querySelector";
import resolutionItem from "@/conf/SettingsModule/resolutionItem";
import moduleToggle from "@/components/moduleToggle";

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
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 250,
      easing: "easeInOutQuad",
      begin: () => {
        logger("Settings", "正在加载");
        this.rootElement.classList.remove("hidden");
      },
      complete() {
        logger("Settings", "载入模块");
      },
    });
  },
  hide(beginExtraCallback?: () => void) {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 250,
      easing: "easeInOutQuad",
      begin: beginExtraCallback,
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Settings", "已隐藏");
      },
    });
  },
};

export default Settings;
