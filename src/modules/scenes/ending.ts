import anime from "animejs";
import scene from "../scene";
import localstorage from "../../utils/localstorage";
import cache from "../../conf/cache";

const writeText = (text: any) => {
  return `<span class="text-th-info">${text}</span>`;
};
const loadIcon = (iconClass: string) => {
  return `<i class="th-icon-ref w-8 h-8 ${iconClass}"></i>`;
};

const ratings = () => {
  if (cache.props.BREAK_CHARS! >= 100) {
    cache.props.COPPER_COUNT! += 120;
    return "S";
  } else if (cache.props.BREAK_CHARS! >= 75) {
    cache.props.COPPER_COUNT! += 120;
    return "A";
  } else if (cache.props.BREAK_CHARS! >= 50) {
    cache.props.COPPER_COUNT! += 120;
    return "B";
  } else if (cache.props.BREAK_CHARS! >= 25) {
    cache.props.COPPER_COUNT! += 120;
    return "C";
  } else {
    cache.props.COPPER_COUNT! += 10;
    return "D";
  }
};
const stats = [
  () => {
    localstorage.save(
      (data) => (data.historyBreak += cache.props.BREAK_CHARS!)
    );
    return `破坏字符：${writeText(cache.props.BREAK_CHARS)}个`;
  },
];
const rewards = [
  () => {
    if (cache.props.COPPER_COUNT) {
      return `${loadIcon("bg-bal-copper-ingot")}${writeText(
        cache.props.COPPER_COUNT
      )}`;
    }
    return null;
  },
];

const endingScene = {
  rootElement: document.querySelector("#ending-module")!,
  rate: document.querySelector("#ending-rate>span")!,
  stat: document.querySelector("#ending-stat>div")!,
  reward: document.querySelector("#ending-reward>div")!,
  returnLobby: document.querySelector("#return-lobby")!,
  update() {
    // 清理上一次的统计、奖励信息
    this.clear();
    console.log("载入Ending模块的评级/统计/奖励信息");
    // 加载评价等级
    this.rate.innerHTML = ratings();
    // 加载统计信息
    stats.forEach((stat) => {
      const result = stat();

      if (result) {
        const el = document.createElement("p");

        el.innerHTML = result;
        this.stat.appendChild(el);
      }
    });
    // 加载奖励信息
    rewards.forEach((reward) => {
      const result = reward();

      if (result) {
        const el = document.createElement("p");

        el.innerHTML = result;
        el.classList.add("th-icon-module");
        this.reward.appendChild(el);
      }
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
    this.stat.innerHTML = "";
    this.reward.innerHTML = "";
  },
};

export default endingScene;
