import { Difficult, History } from "../features";
import Home from "./Home";
import cache from "@/conf/cache";
import ratings from "@/conf/EndingModule/ratings";
import stats from "@/conf/EndingModule/stats";
import rewards from "@/conf/EndingModule/rewards";
import logger from "@/components/logger";
import { querySelector } from "@/components/selector";
import { hideModule, showModule } from "@/components/displaying";
import { RootElementType } from "@/interfaces";

const Ending: EndingModuleProps = {
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
        // 添加一条历史记录
        History.addHistory();
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
        };

        this.returnLobbyElement.addEventListener("click", lobbyHandler);
      },
    });
  },
  hide() {
    hideModule.now(this.rootElement, "Ending", () => {
      // 清空节点遗留下的内容
      this.rateElement.innerHTML = "";
      this.statElement.innerHTML = "";
      this.rewardElement.innerHTML = "";
    });
  },
};

type EndingModuleMethods = {
  updateAssess(): void;
  show(): void;
  hide(): void;
};
type InterfaceExtends = EndingModuleMethods & RootElementType;

interface EndingModuleProps extends InterfaceExtends {
  readonly rateElement: Element;
  readonly statElement: Element;
  readonly rewardElement: Element;
  readonly returnLobbyElement: Element;
}

export default Ending;
export { EndingModuleProps };
