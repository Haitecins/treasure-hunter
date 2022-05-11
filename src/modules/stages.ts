import anime from "animejs";
import logger from "../components/logger";
import scene from "./scene";
import listener from "./listener";
import ticks from "./ticks";
import quests from "./quests";

interface Items {
  value: number;
  exponent: number;
  title: (props: Items) => string;
}

const stages = {
  rootElement: document.querySelector("#stage-select-module")!,
  selectorElement: document.querySelector("#stages-selector")!,
  okBtn: document.querySelector("#stage-ok-btn")!,
  cancelBtn: document.querySelector("#stage-cancel-btn")!,
  degree: document.querySelector("#degree-levels")!,
  degreeDisplay: document.querySelector("#degree-levels-display")!,
  target: {
    // 计时器
    TIMER: 0,
    // 生成速度
    SUMMON_SPEED: 0,
  },
  iterator: {
    // 难度指数
    exponents: <number[]>[],
    // 指数迭代器
    indicator: 0,
    // 是否停止迭代器迭代数值
    stopped: false,
  },
  diffReduces() {
    return this.iterator.exponents.reduce((prev, current) => prev + current, 0);
  },
  show() {
    logger("Stages", "正在加载");
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        this.rootElement.classList.remove("hidden");
        // 初始化难度系数为0
        this.degree.innerHTML = "0";
        // 加载选择器
        this.loadSelector();
      },
      complete: () => {
        logger("Stages", "载入模块");
        // 绑定两个按钮的事件
        this.event();
      },
    });
  },
  hide(animeComplete?: () => void) {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        // 停止迭代器的迭代
        this.iterator.stopped = true;
      },
      complete: () => {
        this.rootElement.classList.add("hidden");
        // 重置难度系数
        this.degree.innerHTML = "0";
        // 完全隐藏后需要做的事情？
        animeComplete?.();
        // 只要模块被隐藏，就需要把选择器全部销毁！
        this.destroySelector();
        logger("Stages", "已隐藏");
      },
    });
  },
  event() {
    const okHandler = () => {
      // 移除两个按钮的事件
      resetEvents();
      // 隐藏模块，但不重置选择器，选择器将在一局游戏结束后重置。
      // 如果在此处重置选择器，那么Entities模块和Ticks模块无法获取到此模块的SUMMON_SPEED和TIMER属性。
      this.hide();
      // 隐藏Home模块
      scene.home.hide(
        () => {
          // 在游戏区域内显示难度系数
          stages.loadDiff();
          // 初始化任务目标
          quests.load();
          // 开启计时
          ticks.start();
        },
        () => {
          // 载入游戏
          scene.chunk.play();
          // 开启键盘监听器
          listener.enable();
        }
      );
    };
    const cancelHandler = () => {
      // 移除两个按钮的事件
      resetEvents();
      // 如果取消选择，那么一定要重置选择器。
      // 如果在此处不重置，那么下一次打开难度选择器时，仍然拥有上一次更改的属性！
      this.hide(() => {
        // 在完全隐藏后，重置选择器
        this.resetSelector();
      });
      // 重新绑定开始按钮的事件
      scene.home.event();
    };
    const resetEvents = () => {
      this.okBtn.removeEventListener("click", okHandler);
      this.cancelBtn.removeEventListener("click", cancelHandler);
    };

    // 绑定事件
    this.okBtn.addEventListener("click", okHandler);
    this.cancelBtn.addEventListener("click", cancelHandler);
  },
  selector(
    title: string,
    id: string,
    options: [Items[], number],
    onchange: (selected: Items) => void
  ) {
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
    // 每个项目的默认值
    (<HTMLInputElement>selects.children[index]).click();
  },
  loadSelector() {
    const title = (props: Items) => `${props.value}秒`;

    // 加载难度选择器
    this.selector(
      "时间限制",
      "time",
      [
        [
          { value: 60, exponent: 100, title },
          { value: 45, exponent: 75, title },
          { value: 30, exponent: 50, title },
          { value: 15, exponent: 25, title },
        ],
        1,
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
      "生成速度",
      "speed",
      [
        [
          { value: 200, exponent: 100, title: () => `非常快` },
          { value: 400, exponent: 75, title: () => `快` },
          { value: 600, exponent: 50, title: () => `慢` },
          { value: 800, exponent: 25, title: () => `非常慢` },
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
  },
  destroySelector() {
    // 清空选择器列表
    this.selectorElement.innerHTML = "";
    logger("Stages", "销毁选择器");
  },
  resetSelector() {
    // 重置项目的更变
    this.target = {
      TIMER: 0,
      SUMMON_SPEED: 0,
    };
    // 重置迭代器
    this.iterator = {
      exponents: [],
      indicator: 0,
      stopped: false,
    };
    logger("Stages", "重置选择器");
  },
  iteratorAnimation() {
    // 改变难度系数
    // animeJS会自动根据当前值进行改变
    anime({
      targets: this.iterator,
      indicator: this.diffReduces(),
      duration: 200,
      easing: "linear",
      update: (el) => {
        // 如果模块被隐藏了，那么迭代器也没有必要工作。
        if (this.iterator.stopped) el.pause();
        this.degree.innerHTML = this.iterator.indicator.toFixed(0);
      },
    });
  },
  loadDiff() {
    this.degreeDisplay.innerHTML = `x${this.diffReduces()} 难度系数`;
    logger("Stages", "加载难度系数指示器");
  },
  cleanDiff() {
    this.degreeDisplay.innerHTML = "";
    logger("Stages", "移除难度系数指示器");
  },
};

export default stages;
