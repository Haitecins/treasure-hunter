import anime from "animejs";
import user from "../user";
import logger from "../../components/logger";
import stages from "../stages";

const homeEventHandler = () => {
  home.start.removeEventListener("click", homeEventHandler);
  // 显示难度选择
  stages.show();
};
const home = {
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
        // 绑定点击事件
        this.start.addEventListener("click", homeEventHandler);
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

export default home;
export { homeEventHandler };
