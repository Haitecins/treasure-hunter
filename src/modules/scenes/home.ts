import anime from "animejs";
import user from "../user";
import logger from "../../components/logger";
import difficult from "../difficult";

const home = {
  rootElement: document.querySelector("#home-scene")!,
  startBtn: document.querySelector("#home-start")!,
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
        // 绑定模块的点击事件
        this.event();
      },
    });
  },
  hide(animeBegin?: () => void, animeComplete?: () => void) {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        animeBegin?.();
      },
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Home", "已隐藏");
        animeComplete?.();
      },
    });
  },
  event() {
    // 开始按钮事件
    const startBtnHandler = () => {
      this.startBtn.removeEventListener("click", startBtnHandler);
      // 显示难度选择模块
      difficult.show();
    };

    this.startBtn.addEventListener("click", startBtnHandler);
  },
};

export default home;
