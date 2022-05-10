import storage from "../libs/storage";
import auth from "./users/auth";
import settings from "../conf/settings";
import query from "../components/query";

const loading = {
  rootElement: query<Element>("#loading"),
  init() {
    // 加载或初始化游戏数据，接着初始化游戏设置。
    storage.load(() => settings.init());

    const loadHandler = () => {
      this.rootElement.removeEventListener("click", loadHandler);
      this.rootElement.remove();
      // 初始化玩家验证
      auth.init();
    };

    document.body.removeAttribute("style");
    this.rootElement.addEventListener("click", loadHandler);
  },
};

export default loading;
