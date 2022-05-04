import storage from "../../libs/storage";
import logger from "../../components/logger";
import settings from "../settings";

const resolution = {
  init(settingObj: typeof settings) {
    const { settings } = storage.get();
    // 设置尺寸大小
    const setSize = (x: string) =>
      (document.documentElement.style.fontSize = x);
    // 修改标签的文本
    const setLabelText = (text: string) =>
      (settingObj.options.resolution.previousElementSibling!.innerHTML = text);

    // 应用更改的设置
    setSize(`${settings.resolution}px`);
    // 显示当前尺寸的具体数值
    setLabelText(`尺寸大小 (${settings.resolution}x)`);
    // 更新滑块的值
    settingObj.options.resolution.value = settings.resolution + "";
    // 添加滑块被改变的事件
    settingObj.options.resolution.addEventListener("change", (ev) => {
      const target = <HTMLInputElement>ev.target;

      console.group("Settings Change Event");
      logger("Settings", "尺寸大小设置发生改变");
      // 保存设置
      storage.save((data) => {
        if (Number(target.value) > 30) {
          data.settings.resolution = 30;
        } else if (Number(target.value) < 12) {
          data.settings.resolution = 12;
        } else {
          data.settings.resolution = +target.value;
        }
      });
      // 更新大小和文本信息
      setSize(`${settings.resolution}px`);
      setLabelText(`尺寸大小 (${settings.resolution}x)`);
      console.groupEnd();
    });
  },
};

export default resolution;
