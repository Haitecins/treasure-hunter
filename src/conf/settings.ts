import logger from "../components/logger";
import anime from "animejs";

const settings = {
  button: document.querySelector("#settings-control")!,
  rootElement: document.querySelector("#settings-module")!,
  init() {
    const openHandler = () => {
      this.button.removeEventListener("click", openHandler);
      this.rootElement.addEventListener("click", closeHandler);
      this.show();
    };
    const closeHandler = () => {
      this.rootElement.removeEventListener("click", closeHandler);
      this.button.addEventListener("click", openHandler);
      this.hide();
    };

    logger("Settings", "初始化");
    this.button.addEventListener("click", openHandler);
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
  hide() {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 250,
      easing: "easeInOutQuad",
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Settings", "已隐藏");
      },
    });
  },
};

export default settings;
