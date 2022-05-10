import storage from "../../libs/storage";
import settings from "../settings";

const resolution = {
  res: 0,
  apply: (size: number | null, label: string) => {
    // 调整分辨率
    if (size) document.documentElement.style.fontSize = `${size}px`;
    // 修改标签的文本
    settings.options.resolution.previousElementSibling!.innerHTML = label;
  },
  init() {
    // 修改分辨率value属性的值为localStorage中的值
    this.res = storage.get().settings.resolution;
    // 应用设置
    this.apply(this.res, `分辨率 (${this.res}x)`);
    // 更新滑块的值
    settings.options.resolution.value = this.res + "";
    // 添加滑块被改变的事件
    settings.options.resolution.addEventListener("change", (ev) => {
      const target = <HTMLInputElement>ev.target;

      // 修改为最新滑块的值
      this.res = +target.value;
      // 不修改分辨率，只改变分辨率的文本信息。
      this.apply(null, `分辨率 (${this.res}x)`);
    });
  },
  save() {
    // 保存设置
    storage.save((data) => {
      if (this.res > 30) {
        data.settings.resolution = 30;
      } else if (this.res < 8) {
        data.settings.resolution = 8;
      } else {
        data.settings.resolution = this.res;
      }
    });
    // 更新信息
    this.apply(this.res, `分辨率 (${this.res}x)`);
  },
};

export default resolution;
