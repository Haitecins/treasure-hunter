import anime from "animejs";
import logger from "@/components/logger";
import { querySelector } from "@/components/querySelector";
import resolutionItem from "@/conf/SettingsModule/resolutionItem";

const Settings = {
  rootElement: querySelector("#settings-module"),
  openElement: querySelector("#settings-open-btn"),
  closeElement: querySelector("#settings-close-btn"),
  options: {
    // 分辨率设置
    resolution: <HTMLInputElement>querySelector("#resolution-option"),
  },
  init() {
    const openHandler = () => {
      // 移除打开设置事件
      this.openElement.removeEventListener("click", openHandler);
      // 添加关闭设置事件
      this.closeElement.addEventListener("click", closeHandler);
      this.show();
    };
    const closeHandler = () => {
      // 移除关闭设置事件
      this.closeElement.removeEventListener("click", closeHandler);
      // 添加打开设置事件
      this.openElement.addEventListener("click", openHandler);
      // 在模块隐藏前保存更改
      this.hide(() => {
        // 应用分辨率设置
        resolutionItem.save();
      });
    };

    logger("Settings", "初始化");
    // 初始化分辨率设置选项
    resolutionItem.init();
    // 初始化绑定打开设置按钮的事件
    this.openElement.addEventListener("click", openHandler);
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
