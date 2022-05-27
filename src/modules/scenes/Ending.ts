import { Difficult } from "../features";
import Home from "./Home";
import storage from "../storage";
import cache from "@/conf/cache";
import ratings from "@/conf/EndingModule/ratings";
import stats from "@/conf/EndingModule/stats";
import rewards from "@/conf/EndingModule/rewards";
import logger from "@/components/logger";
import { querySelector } from "@/components/querySelector";
import { hideModule, showModule } from "@/components/moduleDisplay";

const Ending = {
  rootElement: querySelector("#ending-module"),
  rateElement: querySelector("#ending-rate>span"),
  statElement: querySelector("#ending-stat>div"),
  rewardElement: querySelector("#ending-reward>div"),
  returnLobbyElement: querySelector("#return-lobby"),
  updateAssess() {
    logger("Ending", "已更新");
    // 加载评价等级
    ratings.load(this.rateElement);
    // 加载统计信息
    stats.load(this.statElement);
    // 加载奖励信息
    rewards.load(this.rewardElement);
  },
  show() {
    showModule(this.rootElement, "Ending", {
      begin: () => {
        // 加载评价/统计/奖励
        this.updateAssess();
        // 记录游戏数据
        storage.save((data) => {
          const {
            props: {
              breakChars,
              copperCount: copper,
              ironCount: iron,
              goldCount: gold,
            },
          } = cache;

          data.history = [
            {
              date: new Date().getTime(),
              difficultLevels: Difficult.levels(),
              breakChars,
              balances: { copper, iron, gold },
            },
            ...data.history,
          ];
          // 设置历史记录上限，超过自动删除。
          if (data.history.length > 30) data.history.length = 30;
        });
      },
      complete: () => {
        const lobbyHandler = () => {
          this.returnLobbyElement.removeEventListener("click", lobbyHandler);
          // 重置缓存
          cache.reset();
          // 还原更改
          Difficult.revertChanges();
          // 重新为【开始游戏】按钮绑定open函数事件
          Difficult.rebindOpenEvent();
          // 隐藏模块
          this.hide();
          // 显示Home模块
          Home.show();
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
    hideModule.now(this.rootElement, "Ending");
  },
};

export default Ending;
