import anime from "animejs";
import chunk from "./chunk";
import listener from "../listener";
import ticks from "../ticks";
import user from "../user";
import logger from "../../components/logger";

const homeScene = {
  rootElement: document.querySelector("#home-scene")!,
  start: document.querySelector("#home-start")!,
  show() {
    logger("Home", "正在加载");
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        // 更新Account模块
        user.profile.update();
        this.rootElement.classList.remove("hidden");
      },
      // 加载完成后添加按钮事件
      complete: () => {
        logger("Home", "载入模块");

        const clickHandler = () => {
          this.start.removeEventListener("click", clickHandler);
          // 隐藏Home模块
          this.hide(() => {
            // 载入游戏
            chunk.play();
            // 开启键盘监听器
            listener.enable();
            // 开启计时
            ticks.start();
          });
        };

        this.start.addEventListener("click", clickHandler);
      },
    });
  },
  hide(animeComplete: () => void) {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 200,
      easing: "easeInOutSine",
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Home", "已隐藏");
        animeComplete();
      },
    });
  },
};

export default homeScene;
