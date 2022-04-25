import anime from "animejs";
import scene from "../scene";
import localstorage from "../../utils/localstorage";
import cache from "../../conf/cache";

const loadText = (text: any) => `<span class="text-th-info">${text}</span>`;
const loadIcon = (iconClass: string) =>
  `<i class="th-icon-ref w-8 h-8 ${iconClass}"></i>`;
const getLevel = () => {
  if (cache.refs.breakCount >= 100) {
    return "S";
  } else if (cache.refs.breakCount >= 50) {
    return "A";
  } else if (cache.refs.breakCount >= 25) {
    return "B";
  }
  return "C";
};
const stats = [
  () => {
    const { breakCount } = cache.refs;

    localstorage.save((data) => (data.historyBreak += breakCount));
    return `破坏字符：${loadText(cache.refs.breakCount)}个`;
  },
];
const rewards = [
  () => {
    const { copperCount } = cache.refs.bal;

    localstorage.save(({ balances }) => {
      balances.copper += copperCount;
    });
    return `${loadIcon("bg-bal-copper-ingot")}${loadText(
      cache.refs.bal.copperCount
    )}`;
  },
];
const endingScene = {
  rootElement: document.querySelector("#ending-module")!,
  evaluation: document.querySelector("#ending-evaluation>span")!,
  statistic: document.querySelector("#ending-statistic>div")!,
  rewardList: document.querySelector("#ending-reward-list>div")!,
  returnLobby: document.querySelector("#return-lobby")!,
  update() {
    // 清理上一次的统计、奖励信息
    this.clear();
    console.log("载入Ending模块的评级/统计/奖励信息");

    // 评价等级
    this.evaluation.innerHTML = getLevel();
    // 统计信息
    stats.forEach((getInfo) => {
      const el = document.createElement("p");

      el.innerHTML = getInfo();
      this.statistic.appendChild(el);
    });
    // 奖励列表
    rewards.forEach((getInfo) => {
      const el = document.createElement("div");

      el.classList.add("th-icon-module");
      el.innerHTML = getInfo();
      this.rewardList.appendChild(el);
    });
  },
  show() {
    console.log("正在加载Ending模块");
    const { clientHeight } = document.documentElement;

    anime({
      targets: this.rootElement,
      translateY: [clientHeight, 0],
      duration: 500,
      easing: "easeInOutSine",
      begin: () => {
        // 加载统计信息/奖励列表
        this.update();
        this.rootElement.classList.remove("hidden");
      },
      complete: () => {
        console.log("Ending模块显示");
        const lobbyHandler = () => {
          this.returnLobby.removeEventListener("click", lobbyHandler);
          this.hide();
          // 重置缓存
          cache.reset();
          // 显示Home模块
          scene.home.show();
        };

        this.returnLobby.addEventListener("click", lobbyHandler);
      },
    });
  },
  hide() {
    this.rootElement.classList.add("hidden");
    console.log("Ending模块隐藏");
  },
  clear() {
    this.statistic.innerHTML = "";
    this.rewardList.innerHTML = "";
  },
};

export default endingScene;
