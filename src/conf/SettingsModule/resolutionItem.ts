import { Settings } from "@/modules/features";
import storage from "@/modules/storage";

const resolutionItem = {
  value: 0,
  apply: (size: number | null, label: string) => {
    const { resolution } = Settings.options;
    const screen = document.documentElement.style;
    const resLabel = resolution.previousElementSibling!;

    // 调整分辨率
    if (size) screen.fontSize = `${size}px`;
    // 修改标签的文本
    resLabel.innerHTML = label;
  },
  init() {
    const savedSettings = storage.get().settings;
    const resolutionSlider = Settings.options.resolution;

    // 修改分辨率value属性的值为localStorage中的值
    this.value = savedSettings.resolution;
    // 应用设置
    this.apply(this.value, `分辨率 (${this.value}x)`);
    // 更新滑块的值
    resolutionSlider.value = this.value + "";
    // 添加滑块被改变的事件
    resolutionSlider.addEventListener("change", (ev) => {
      const slider = <HTMLInputElement>ev.target;

      // 修改为最新滑块的值
      this.value = +slider.value;
      // 不修改分辨率，只改变分辨率的文本信息。
      this.apply(null, `分辨率 (${this.value}x)`);
    });
  },
  save() {
    // 保存设置
    storage.save((data) => {
      const localSettings = data.settings;

      if (this.value > 30) {
        localSettings.resolution = 30;
      } else if (this.value < 8) {
        localSettings.resolution = 8;
      } else {
        localSettings.resolution = this.value;
      }
    });
    // 更新信息
    this.apply(this.value, `分辨率 (${this.value}x)`);
  },
};

export default resolutionItem;
