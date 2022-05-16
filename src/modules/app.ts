import storage from "../libs/storage";
import auth from "./users/auth";
import settings from "../conf/settings";

const app = {
  loadingPage: document.querySelector("#loading-page")!,
  createApp() {
    // 加载或初始化游戏数据，接着初始化游戏设置。
    storage.load(() => settings.init());
    const loadHandler = () => {
      this.loadingPage.removeEventListener("click", loadHandler);
      this.loadingPage.remove();
      // 初始化玩家验证
      auth.init();
    };

    document.body.removeAttribute("style");
    this.loadingPage.addEventListener("click", loadHandler);
  },
};

export default app;
