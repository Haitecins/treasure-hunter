import anime from "animejs";
import scene from "../scene";
import localstorage from "../../utils/localstorage";
import cache from "../../conf/cache";

const endingScene = {
  rootElement: document.querySelector("#ending-module")!,
  statistic: document.querySelector("#ending-statistic>div")!,
  rewardList: document.querySelector("#ending-reward-list>div")!,
  returnLobby: document.querySelector("#return-lobby")!,
  update() {
    // 清理上一次的统计、奖励信息
    this.clear();
    console.log("加载Ending模块中的统计、奖励");
    const loadText = (text: any) => `<span class="text-th-info">${text}</span>`;
    const loadIcon = (iconClass: string) =>
      `<i class="th-icon-ref w-8 h-8 ${iconClass}"></i>`;
    const statistics = [
      () => {
        localstorage.save(
          (data) => (data.historyBreak += cache.refs.breakCount)
        );
        return `破坏字符：${loadText(cache.refs.breakCount)}`;
      },
    ];
    const rewards = [
      () => {
        localstorage.save((data) => {
          data.balances.copper += cache.refs.bal.copperCount;
        });
        return `${loadIcon("bg-bal-copper-ingot")}${loadText(
          cache.refs.bal.copperCount
        )}`;
      },
    ];

    statistics.forEach((item) => {
      const el = document.createElement("p");
      el.innerHTML = item();
      this.statistic.appendChild(el);
    });
    rewards.forEach((item) => {
      const el = document.createElement("div");
      el.classList.add("th-icon-module");
      el.innerHTML = item();
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
