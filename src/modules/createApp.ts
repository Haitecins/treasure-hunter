import settings from "../conf/settings";
import storage from "./storage";
import auth from "./users/auth";
import { querySelector } from "../components/querySelector";

const createApp = () => {
  const loadingElement = querySelector("#loading-page");
  const loadHandler = () => {
    // 移除点击事件
    loadingElement.removeEventListener("click", loadHandler);
    // 删除loading元素
    loadingElement.remove();
    // 初始化验证模块
    auth.init();
  };

  // 加载或初始化游戏数据
  storage.load(() => {
    // 初始化游戏设置
    settings.init();
    // 显示body内容
    document.body.removeAttribute("style");
    // 添加点击事件
    loadingElement.addEventListener("click", loadHandler);
  });
};

export default createApp;
