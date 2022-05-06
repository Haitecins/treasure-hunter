import anime from "animejs";
import logger from "../components/logger";
import scene from "./scene";
import listener from "./listener";
import ticks from "./ticks";

const stages = {
  rootElement: document.querySelector("#stage-select-module")!,
  okBtn: document.querySelector("#stage-ok-btn")!,
  cancelBtn: document.querySelector("#stage-cancel-btn")!,
  show() {
    logger("Stages", "正在加载");
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        this.rootElement.classList.remove("hidden");
      },
      complete: () => {
        logger("Stages", "载入模块");
        // 绑定两个按钮的事件
        this.event();
      },
    });
  },
  hide() {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 200,
      easing: "easeInOutSine",
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Stages", "已隐藏");
      },
    });
  },
  event() {
    const okHandler = () => {
      this.hide();
      // 移除两个按钮的事件
      removeHandler();
      // 隐藏Home模块
      scene.home.hide(() => {
        // 载入游戏
        scene.chunk.play();
        // 开启键盘监听器
        listener.enable();
        // 开启计时
        ticks.start();
      });
    };
    const cancelHandler = () => {
      // 移除两个按钮的事件
      removeHandler();
      this.hide();
      // 重新绑定开始按钮的事件
      scene.home.event();
    };
    const removeHandler = () => {
      this.okBtn.removeEventListener("click", okHandler);
      this.cancelBtn.removeEventListener("click", cancelHandler);
    };

    // 绑定事件
    this.okBtn.addEventListener("click", okHandler);
    this.cancelBtn.addEventListener("click", cancelHandler);
  },
};

export default stages;
