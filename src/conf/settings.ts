import anime from "animejs";
import logger from "../components/logger";
import storage from "../libs/storage";

const settings = {
  openElement: document.querySelector("#settings-open-btn")!,
  closeElement: document.querySelector("#settings-close-btn")!,
  rootElement: document.querySelector("#settings-module")!,
  options: {
    resolution: <HTMLInputElement>document.querySelector("#resolution-option"),
  },
  init() {
    const openHandler = () => {
      this.openElement.removeEventListener("click", openHandler);
      this.closeElement.addEventListener("click", closeHandler);
      this.show();
    };
    const closeHandler = () => {
      this.closeElement.removeEventListener("click", closeHandler);
      this.openElement.addEventListener("click", openHandler);
      this.hide();
    };

    logger("Settings", "初始化");
    this.resolutionTracker();
    this.openElement.addEventListener("click", openHandler);
  },
  resolutionTracker() {
    const { settings } = storage.get();
    const size = (x: string) => (document.documentElement.style.fontSize = x);
    const labelText = (text: string) =>
      (this.options.resolution.previousElementSibling!.innerHTML = text);

    // 应用更改的设置
    size(`${settings.resolution}px`);
    // 更新滑块的值
    this.options.resolution.value = String(settings.resolution);
    // 显示当前尺寸的具体数值
    labelText(`尺寸大小 (${settings.resolution})`);

    // 添加滑块被改变的事件
    this.options.resolution.addEventListener("change", (ev) => {
      const target = <HTMLInputElement>ev.target;

      console.group("Settings Conf Event");
      logger("Settings", "尺寸大小设置发生改变");
      // 保存设置
      storage.save((data) => {
        data.settings.resolution = Number(target.value);
      });
      // 更新大小和文本信息
      size(`${settings.resolution}px`);
      labelText(`尺寸大小 (${settings.resolution})`);
      console.groupEnd();
    });
  },
  show() {
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 250,
      easing: "easeInOutQuad",
      begin: () => {
        logger("Settings", "正在加载");
        this.rootElement.classList.remove("hidden");
      },
      complete() {
        logger("Settings", "载入模块");
      },
    });
  },
  hide() {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 250,
      easing: "easeInOutQuad",
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Settings", "已隐藏");
      },
    });
  },
};

export default settings;
