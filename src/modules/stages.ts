import anime from "animejs";
import logger from "../components/logger";
import scene from "./scene";
import listener from "./listener";
import ticks from "./ticks";

interface Selector {
  value: number;
  index: number;
}

const stages = {
  rootElement: document.querySelector("#stage-select-module")!,
  okBtn: document.querySelector("#stage-ok-btn")!,
  cancelBtn: document.querySelector("#stage-cancel-btn")!,
  stageSelector: document.querySelector("#stages-selector")!,
  levelIndex: document.querySelector("#lv-index")!,
  animeObj: {
    value: 0,
  },
  opts: {
    time: 0,
    speed: 0,
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
        // 加载选择器
        this.selector(
          "时间限制",
          "time",
          [
            { value: 15, index: 100 },
            { value: 30, index: 75 },
            { value: 45, index: 50 },
            { value: 60, index: 25 },
          ],
          "秒",
          (value) => {
            this.opts.time = value;
          }
        );
        this.selector(
          "生成速度",
          "speed",
          [
            { value: 150, index: 100 },
            { value: 300, index: 75 },
            { value: 450, index: 50 },
            { value: 600, index: 25 },
          ],
          "毫秒",
          (value) => {
            this.opts.speed = value;
          }
        );
      },
      complete: () => {
        logger("Stages", "载入模块");
        // 绑定两个按钮的事件
        this.event();
        // 默认选项
        (<HTMLInputElement>(
          this.stageSelector.children[0].querySelectorAll(".stages-option")[2]
        )).click();
      },
    });
  },
  hide() {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 200,
      easing: "easeInOutSine",
      complete: () => {
        this.rootElement.classList.add("hidden");
        // 清空选择器
        this.stageSelector.innerHTML = "";
        logger("Stages", "已隐藏");
      },
    });
  },
  event() {
    const okHandler = () => {
      if (!this.opts.time || !this.opts.speed) return;
      this.hide();
      // 移除两个按钮的事件
      removeHandler();
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
      removeHandler();
      this.hide();
      // 重新绑定开始按钮的事件
      scene.home.event();
    };
    const removeHandler = () => {
      this.okBtn.removeEventListener("click", okHandler);
      this.cancelBtn.removeEventListener("click", cancelHandler);
    };

    // 绑定事件
    this.okBtn.addEventListener("click", okHandler);
    this.cancelBtn.addEventListener("click", cancelHandler);
  },
  selector(
    title: string,
    name: string,
    selector: Selector[],
    digits: string,
    callback: (value: number) => void
  ) {
    const container = document.createElement("div");
    const label = document.createElement("div");
    const selects = document.createElement("div");

    container.classList.add("text-2xl", "my-3");
    label.classList.add(
      "text-center",
      "border-b-2",
      "border-b-th-white",
      "mx-10",
      "pb-2",
      "mb-2"
    );
    label.innerHTML = title;
    selects.classList.add("flex", "justify-evenly");
    // 遍历所有的选项
    selector.forEach((props) => {
      const box = document.createElement("div");
      const label = document.createElement("label");
      const input = document.createElement("input");

      input.type = "radio";
      input.name = name;
      input.value = props.value + "";
      input.classList.add("mr-2", "cursor-pointer");
      label.classList.add(
        "stages-option",
        "flex",
        "items-center",
        "cursor-pointer"
      );
      label.appendChild(input);
      label.innerHTML += `${props.value}${digits}`;
      Object.defineProperty(label, "props", {
        value: { ...props },
      });
      box.addEventListener("input", () => {
        callback((<Element & { props: Selector }>box.children[0]).props.value);
        const available = Array.prototype.slice.call(
          document.querySelectorAll(".stages-option")
        );
        const selected = available.filter((el) => el.children[0].checked);
        const index = selected.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.props.index;
        }, 0);

        anime({
          targets: this.animeObj,
          value: index,
          easing: "easeInOutQuad",
          duration: 250,
          update: () => {
            this.levelIndex.innerHTML = this.animeObj.value.toFixed(0);
          },
          complete: () => {
            this.animeObj.value = +this.levelIndex.innerHTML;
          },
        });
      });
      box.appendChild(label);
      selects.appendChild(box);
    });
    container.appendChild(label);
    container.appendChild(selects);
    this.stageSelector.appendChild(container);
  },
};

export default stages;
