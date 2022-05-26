import anime from "animejs";
import { querySelector } from "@/components/querySelector";
import logger from "@/components/logger";
import moduleToggle from "@/components/moduleToggle";

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
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 250,
      easing: "easeInOutQuad",
      begin: () => {
        logger("Store", "正在加载");
        this.rootElement.classList.remove("hidden");
      },
      complete() {
        logger("Store", "载入模块");
      },
    });
  },
  hide() {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 250,
      easing: "easeInOutQuad",
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Store", "已隐藏");
      },
    });
  },
};

export default Store;
