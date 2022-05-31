import anime from "animejs";
import { Chunk, Home } from "../scenes";
import cache from "@/conf/cache";
import listener from "../listener";
import ticks from "../ticks";
import quests from "../quests";
import { querySelector } from "@/components/selector";
import logger from "@/components/logger";
import switcher from "@/components/switcher";
import { hideModule, showModule } from "@/components/displaying";
import { ModuleToggleType, RootElementType } from "@/global-types";

let getOpenHandler: () => void;
const Difficult: DifficultPropsType = {
  rootElement: querySelector("#difficult-select-module"),
  selectorElement: querySelector("#difficult-selector"),
  openElement: querySelector("#difficult-ok-btn"),
  closeElement: querySelector("#difficult-cancel-btn"),
  degreeElement: querySelector("#degree-levels"),
  degreeInGamingElement: querySelector("#degree-levels-display"),
  target: {
    // 计时器
    TIMER: 0,
    // 生成速度
    SUMMON_SPEED: 0,
    // 移动次数
    STEP_COUNTS: 0,
  },
  iterator: {
    // 难度指数
    exponents: [],
    // 指数迭代器
    indicator: 0,
    // 是否停止迭代器迭代数值
    stopped: false,
  },
  levels() {
    return this.iterator.exponents.reduce((prev, current) => prev + current, 0);
  },
  show() {
    showModule(this.rootElement, "Difficult", {
      begin: () => {
        // 初始化难度系数为0
        this.degreeElement.innerHTML = "0";
        // 加载选择器
        this.loadSelector();
      },
    });
  },
  hide(animeComplete) {
    hideModule(this.rootElement, "Difficult", {
      begin: () => {
        // 停止迭代器的迭代
        this.iterator.stopped = true;
      },
      complete: () => {
        // 重置难度系数
        this.degreeElement.innerHTML = "0";
        // 完全隐藏后需要做的事情？
        animeComplete?.();
        // 模块隐藏后销毁选择器！
        this.destroySelector();
      },
    });
  },
  init() {
    const confirmHandler = () => {
      // 隐藏模块
      this.hide();
      // 解除【选好了】按钮事件绑定
      this.openElement.removeEventListener("click", confirmHandler);
      // 开始游戏
      Home.hide(
        () => {
          // 在游戏区域内显示难度系数
          Difficult.showLevels();
          // 初始化任务目标
          quests.init();
          // 开启计时
          ticks.start();
        },
        () => {
          // 载入游戏
          Chunk.play();
          // 开启键盘监听器
          listener.enable();
          // 正在游戏
          cache.props.isPlaying = true;
        }
      );
    };

    getOpenHandler = switcher(
      {
        open: Home.startElement,
        close: this.closeElement,
      },
      () => {
        this.show();
        // 打开后绑定【选好了】按钮事件
        this.openElement.addEventListener("click", confirmHandler);
      },
      () => {
        this.hide(() => {
          // 在模块隐藏后，还原更改。
          this.revertChanges();
        });
        // 解除【选好了】按钮事件绑定
        this.openElement.removeEventListener("click", confirmHandler);
      }
    );
  },
  rebindOpenEvent() {
    // 重新为【开始游戏】按钮绑定open函数事件
    Home.startElement.addEventListener("click", getOpenHandler);
  },
  selector(title, id, options, onchange) {
    const container = document.createElement("div");
    const label = document.createElement("div");
    const selects = document.createElement("div");
    const [list, index] = options;

    container.classList.add("my-3");
    label.classList.add(
      "text-2xl",
      "text-center",
      "border-b-2",
      "border-b-th-white",
      "mx-10",
      "pb-2",
      "mb-2"
    );
    label.innerHTML = title;
    selects.classList.add("flex", "justify-evenly", "text-xl");
    list.forEach((props) => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      // 设置按钮的属性
      input.classList.add("mr-2", "cursor-pointer");
      input.type = "radio";
      input.name = id;

      // 设置标题的属性
      label.appendChild(input);
      label.classList.add("flex", "items-center", "cursor-pointer");
      label.innerHTML += `${props.title(props)}`;
      label.addEventListener("change", () => onchange(props));
      selects.appendChild(label);
    });
    container.appendChild(label);
    container.appendChild(selects);
    this.selectorElement.appendChild(container);
    // 默认选择的值
    (<HTMLInputElement>selects.children[index]).click();
  },
  loadSelector() {
    const timerLimit = (props: DifficultItemPropsType) => `${props.value}秒`;
    const runningLimit = (props: DifficultItemPropsType) => `${props.value}次`;

    // 加载难度选择器
    this.selector(
      "时间",
      "time",
      [
        [
          { value: 60, exponent: 90, title: timerLimit },
          { value: 45, exponent: 60, title: timerLimit },
          { value: 30, exponent: 45, title: timerLimit },
          { value: 15, exponent: 15, title: timerLimit },
        ],
        2,
      ],
      ({ value, exponent }) => {
        // 修改设定的时间
        this.target.TIMER = value;
        // 修改难度指数
        this.iterator.exponents[0] = exponent;
        // 执行迭代器动画
        this.iteratorAnimation();
      }
    );
    this.selector(
      "字块生成速度",
      "speed",
      [
        [
          { value: 320, exponent: 125, title: () => `非常快` },
          { value: 410, exponent: 100, title: () => `快` },
          { value: 530, exponent: 75, title: () => `中` },
          { value: 590, exponent: 50, title: () => `慢` },
          { value: 610, exponent: 25, title: () => `非常慢` },
        ],
        2,
      ],
      ({ value, exponent }) => {
        // 修改设定的生成速度
        this.target.SUMMON_SPEED = value;
        this.iterator.exponents[1] = exponent;
        this.iteratorAnimation();
      }
    );
    this.selector(
      "字块移动次数",
      "navigation",
      [
        [
          { value: 1, exponent: 60, title: runningLimit },
          { value: 3, exponent: 40, title: runningLimit },
          { value: 5, exponent: 20, title: runningLimit },
        ],
        1,
      ],
      ({ value, exponent }) => {
        // 修改设定的生成速度
        this.target.STEP_COUNTS = value;
        this.iterator.exponents[2] = exponent;
        this.iteratorAnimation();
      }
    );
  },
  destroySelector() {
    // 清空选择器列表
    this.selectorElement.innerHTML = "";
    logger("Difficult", "销毁选择器");
  },
  iteratorAnimation() {
    // 改变难度系数
    // animeJS会自动根据当前值进行改变
    anime({
      targets: this.iterator,
      indicator: this.levels(),
      duration: 250,
      easing: "linear",
      update: (elem) => {
        // 如果模块被隐藏了，那么迭代器也没有必要工作。
        if (this.iterator.stopped) elem.pause();
        this.degreeElement.innerHTML = this.iterator.indicator.toFixed(0);
      },
    });
  },
  revertChanges() {
    // 重置项目的更变
    this.target = {
      TIMER: 0,
      SUMMON_SPEED: 0,
      STEP_COUNTS: 0,
    };
    // 重置迭代器
    this.iterator = {
      exponents: [],
      indicator: 0,
      stopped: false,
    };
    logger("Difficult", "重置选择器");
  },
  showLevels() {
    this.degreeInGamingElement.innerHTML = `Lv.${this.levels()}`;
    logger("Difficult", "加载难度系数指示器");
  },
  hideLevels() {
    this.degreeInGamingElement.innerHTML = "";
    logger("Difficult", "移除难度系数指示器");
  },
};

type DifficultMethodsType = {
  init(): void;
  show(): void;
  hide(animeComplete?: () => void): void;
  levels(): number;
  rebindOpenEvent(): void;
  selector(
    title: string,
    id: string,
    options: [DifficultItemPropsType[], number],
    onchange: (selected: DifficultItemPropsType) => void
  ): void;
  loadSelector(): void;
  destroySelector(): void;
  iteratorAnimation(): void;
  revertChanges(): void;
  showLevels(): void;
  hideLevels(): void;
};
type DifficultItemPropsType = {
  value: number;
  exponent: number;
  title: (props: DifficultItemPropsType) => string;
};
type ExtendsType = DifficultMethodsType & RootElementType & ModuleToggleType;

interface DifficultPropsType extends ExtendsType {
  readonly selectorElement: Element;
  readonly degreeElement: Element;
  readonly degreeInGamingElement: Element;
  target: {
    TIMER: number;
    SUMMON_SPEED: number;
    STEP_COUNTS: number;
  };
  iterator: {
    exponents: number[];
    indicator: number;
    stopped: boolean;
  };
}

export default Difficult;
export { DifficultItemPropsType, DifficultPropsType };
