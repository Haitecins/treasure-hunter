import anime from "animejs";
import user from "../user";
import logger from "../../components/logger";
import difficult from "../difficult";
import { querySelector } from "../../components/querySelector";

const home = {
  rootElement: querySelector("#home-scene"),
  startElement: querySelector("#home-start"),
  show(animeCompleteCallback?: () => void) {
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
        // 绑定模块的点击事件
        this.event();
        // 加载完成后需要做的事情
        animeCompleteCallback?.();
      },
    });
  },
  hide(animeBeginCallback?: () => void, animeCompleteCallback?: () => void) {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        animeBeginCallback?.();
      },
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Home", "已隐藏");
        animeCompleteCallback?.();
      },
    });
  },
  event() {
    // 开始按钮事件
    const startBtnHandler = () => {
      this.startElement.removeEventListener("click", startBtnHandler);

      // 显示难度选择模块
      difficult.show();
    };

    this.startElement.addEventListener("click", startBtnHandler);
  },
};

export default home;
