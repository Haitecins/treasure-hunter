import anime from "animejs";
import logger from "../components/logger";
import scene from "./scene";
import { homeEventHandler } from "./scenes/home";
import listener from "./listener";
import ticks from "./ticks";

const okHandler = () => {
  // 销毁确认与取消的事件
  stages.destroyEvent(() => {
    stages.hide();
    // 隐藏Home模块
    scene.home.hide(() => {
      // 载入游戏
      scene.chunk.play();
      // 开启键盘监听器
      listener.enable();
      // 开启计时
      ticks.start();
    });
  });
};
const cancelHandler = () => {
  stages.hide();
  // 为开始按钮绑定事件
  scene.home.start.addEventListener("click", homeEventHandler);
};
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
        this.okBtn.addEventListener("click", okHandler);
        this.cancelBtn.addEventListener("click", cancelHandler);
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
  destroyEvent(callback?: () => void) {
    this.okBtn.removeEventListener("click", okHandler);
    this.cancelBtn.removeEventListener("click", cancelHandler);
    callback?.();
  },
};

export default stages;
