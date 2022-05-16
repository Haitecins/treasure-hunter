import anime from "animejs";
import scene from "../scene";
import difficult from "../difficult";
import cache from "../../conf/cache";
import ratings from "../../conf/ending/ratings";
import stats from "../../conf/ending/stats";
import rewards from "../../conf/ending/rewards";
import logger from "../../components/logger";
import { querySelector } from "../../components/querySelector";

const ending = {
  rootElement: querySelector("#ending-module"),
  rateElement: querySelector("#ending-rate>span"),
  statElement: querySelector("#ending-stat>div"),
  rewardElement: querySelector("#ending-reward>div"),
  returnLobbyElement: querySelector("#return-lobby"),
  update() {
    logger("Ending", "已更新");
    // 加载评价等级
    ratings.load(this.rateElement);
    // 加载统计信息
    stats.load(this.statElement);
    // 加载奖励信息
    rewards.load(this.rewardElement);
  },
  show() {
    logger("Ending", "正在加载");
    const { clientHeight } = document.documentElement;

    anime({
      targets: this.rootElement,
      translateY: [clientHeight, 0],
      duration: 500,
      easing: "easeInOutSine",
      begin: () => {
        // 加载评价/统计/奖励
        this.update();
        // 返回首页前重置难度选择器
        difficult.resetSelector();
        this.rootElement.classList.remove("hidden");
      },
      complete: () => {
        logger("Ending", "载入模块");
        const lobbyHandler = () => {
          this.returnLobbyElement.removeEventListener("click", lobbyHandler);
          // 隐藏模块
          this.hide();
          // 重置缓存
          cache.reset();
          // 显示Home模块
          scene.home.show();
          // 清空节点遗留下的内容
          this.rateElement.innerHTML = "";
          this.statElement.innerHTML = "";
          this.rewardElement.innerHTML = "";
        };

        this.returnLobbyElement.addEventListener("click", lobbyHandler);
      },
    });
  },
  hide() {
    this.rootElement.classList.add("hidden");
    logger("Ending", "已隐藏");
  },
};

export default ending;
