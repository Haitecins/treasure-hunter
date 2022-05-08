import anime from "animejs";
import logger from "../components/logger";
import scene from "./scene";
import listener from "./listener";
import ticks from "./ticks";

interface Items {
  value: number;
  exponent: number;
}

const readonlyTarget = {
  // 计时器
  TIMER: 0,
  // 生成速度
  SUMMON_SPEED: 0,
};
const readonlyIterator = {
  // 难度指数
  exponents: <number[]>[],
  // 指数迭代器
  indicator: 0,
};
const stages = {
  rootElement: document.querySelector("#stage-select-module")!,
  selectorElement: document.querySelector("#stages-selector")!,
  okBtn: document.querySelector("#stage-ok-btn")!,
  cancelBtn: document.querySelector("#stage-cancel-btn")!,
  degree: document.querySelector("#degree-levels")!,
  target: { ...readonlyTarget },
  iterator: { ...readonlyIterator },
  show() {
    logger("Stages", "正在加载");
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        this.rootElement.classList.remove("hidden");
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
  hide(beginCallback?: () => void) {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        beginCallback?.();
        // 销毁选择器
        this.destroySelector();
      },
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Stages", "已隐藏");
      },
    });
  },
  event() {
    const okHandler = () => {
      // 移除两个按钮的事件
      resetEvents();
      this.hide();
      // 隐藏Home模块
      scene.home.hide(() => {
        // 载入游戏
        scene.chunk.play();
        // 开启键盘监听器
        listener.enable();
        // 开启计时
        ticks.start();
      });
    };
    const cancelHandler = () => {
      // 移除两个按钮的事件
      resetEvents();
      // 关闭后重置选择器
      this.hide(() => this.resetSelector());
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
    options: Items[],
    digits: string,
    onchange: (selected: Items) => void
  ) {
    const container = document.createElement("div");
    const label = document.createElement("div");
    const selects = document.createElement("div");

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
    options.forEach((props) => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      // 设置按钮的属性
      input.classList.add("mr-2", "cursor-pointer");
      input.type = "radio";
      input.name = id;

      // 设置标题的属性
      label.appendChild(input);
      label.classList.add("flex", "items-center", "cursor-pointer");
      label.innerHTML += `${props.value}${digits}`;
      label.addEventListener("change", () => onchange(props));
      selects.appendChild(label);
    });
    container.appendChild(label);
    container.appendChild(selects);
    this.selectorElement.appendChild(container);
  },
  loadSelector() {
    // 加载难度选择器
    this.selector(
      "时间限制",
      "time",
      [
        { value: 15, exponent: 100 },
        { value: 30, exponent: 75 },
        { value: 45, exponent: 50 },
        { value: 60, exponent: 25 },
      ],
      "秒",
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
        { value: 150, exponent: 100 },
        { value: 300, exponent: 75 },
        { value: 450, exponent: 50 },
        { value: 600, exponent: 25 },
      ],
      "毫秒",
      ({ value, exponent }) => {
        // 修改设定的生成速度
        this.target.SUMMON_SPEED = value;
        // 修改难度指数
        this.iterator.exponents[1] = exponent;
        this.iteratorAnimation();
      }
    );
  },
  destroySelector() {
    // 清空选择器列表
    this.selectorElement.innerHTML = "";
  },
  resetSelector() {
    // 清除难度系数
    this.degree.innerHTML = "0";
    // 重置项目的更变
    this.target = { ...readonlyTarget };
    // 重置迭代器
    this.iterator = { ...readonlyIterator };
    logger("Stages", "重置选择器");
  },
  iteratorAnimation() {
    const { exponents } = this.iterator;

    // 难度指数改变的动画
    // animeJS会自动根据当前值进行改变
    anime({
      targets: this.iterator,
      indicator: exponents.reduce((prev, current) => prev + current, 0),
      duration: 200,
      easing: "linear",
      update: () =>
        (this.degree.innerHTML = this.iterator.indicator.toFixed(0)),
    });
  },
};

export default stages;
