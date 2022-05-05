import anime from "animejs";
import logger from "../components/logger";
import resolution from "./settings/resolution";

const settings = {
  openElement: document.querySelector("#settings-open-btn")!,
  closeElement: document.querySelector("#settings-close-btn")!,
  rootElement: document.querySelector("#settings-module")!,
  options: {
    resolution: <HTMLInputElement>document.querySelector("#resolution-option"),
  },
  init() {
    const openHandler = () => {
      this.openElement.removeEventListener("click", openHandler);
      this.closeElement.addEventListener("click", closeHandler);
      this.show();
    };
    const closeHandler = () => {
      this.closeElement.removeEventListener("click", closeHandler);
      this.openElement.addEventListener("click", openHandler);
      this.hide(() => {
        // 保存更改
        resolution.save();
      });
    };

    logger("Settings", "初始化");
    this.openElement.addEventListener("click", openHandler);
    // 初始化分辨率设置选项
    resolution.init();
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

export default settings;
