import anime from "animejs";
import { Difficult } from "../features";
import { Profile } from "../users";
import logger from "@/components/logger";
import { querySelector } from "@/components/querySelector";

const Home = {
  rootElement: querySelector("#home-scene"),
  startElement: querySelector("#home-start"),
  show() {
    logger("Home", "正在加载");
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        // 更新Profile模块
        Profile.updateBar();
        this.rootElement.classList.remove("hidden");
      },
      // 加载完成后添加按钮事件
      complete: () => {
        logger("Home", "载入模块");
        // 绑定自身模块的点击事件
        this.event();
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
      Difficult.show();
    };

    this.startElement.addEventListener("click", startBtnHandler);
  },
};

export default Home;
