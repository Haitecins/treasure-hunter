import cache from "@/conf/cache";
import { Difficult } from "./features";
import { querySelector } from "@/components/selector";
import { hideModule, showModule } from "@/components/displaying";
import { RootElementType } from "@/interfaces";

const quests: QuestModuleProps = {
  rootElement: querySelector("#quests-progress"),
  currentElement: querySelector("#quest-current"),
  targetElement: querySelector("#quest-target"),
  targetValue: 0,
  load() {
    const { target } = Difficult;
    const value = Math.floor(
      (target.TIMER * 1000) / target.SUMMON_SPEED -
        (target.TIMER * 1000) / target.SUMMON_SPEED / 3
    );

    this.targetValue = value;
    this.currentElement.innerHTML = "0";
    this.targetElement.innerHTML = value + "";
  },
  updateTarget() {
    // 增加一次字块计数，并将数值写到current元素中。
    this.currentElement.innerHTML = ++cache.props.breakChars + "";
    if (cache.props.breakChars >= this.targetValue) {
      this.targetElement.innerHTML = "Completed";
    }
  },
  init() {
    showModule.now(this.rootElement, "Quests", () => {
      // 载入任务目标
      this.load();
    });
  },
  hide() {
    hideModule.now(this.rootElement, "Quests", () => {
      this.currentElement.innerHTML = "";
      this.targetElement.innerHTML = "";
      this.targetValue = 0;
    });
  },
};

type QuestModuleMethods = {
  load(): void;
  updateTarget(): void;
  init(): void;
  hide(): void;
};
type InterfaceExtends = QuestModuleMethods & RootElementType;

interface QuestModuleProps extends InterfaceExtends {
  readonly currentElement: Element;
  readonly targetElement: Element;
  targetValue: number;
}

export default quests;
export { QuestModuleProps };
