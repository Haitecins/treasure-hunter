import anime from "animejs";
import scene from "../scene";
import difficult from "../difficult";
import cache from "../../conf/cache";
import ratings from "../../conf/ending/ratings";
import stats from "../../conf/ending/stats";
import rewards from "../../conf/ending/rewards";
import logger from "../../components/logger";

const ending = {
  rootElement: document.querySelector("#ending-module")!,
  rate: document.querySelector("#ending-rate>span")!,
  stat: document.querySelector("#ending-stat>div")!,
  reward: document.querySelector("#ending-reward>div")!,
  returnLobby: document.querySelector("#return-lobby")!,
  update() {
    logger("Ending", "已更新");
    // 加载评价等级
    this.rate.innerHTML = ratings.get();
    // 加载统计信息
    stats.load(this.stat);
    // 加载奖励信息
    rewards.load(this.reward);
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
          this.returnLobby.removeEventListener("click", lobbyHandler);
          this.hide();
          // 重置缓存
          cache.reset();
          // 显示Home模块
          scene.home.show();
          // 清空节点遗留下的内容
          this.rate.innerHTML = "";
          this.stat.innerHTML = "";
          this.reward.innerHTML = "";
        };

        this.returnLobby.addEventListener("click", lobbyHandler);
      },
    });
  },
  hide() {
    this.rootElement.classList.add("hidden");
    logger("Ending", "已隐藏");
  },
};

export default ending;
