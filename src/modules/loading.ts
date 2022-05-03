import storage from "../libs/storage";
import auth from "./users/auth";

const loading = {
  rootElement: document.querySelector("#loading")!,
  init() {
    const loadHandler = () => {
      this.rootElement.removeEventListener("click", loadHandler);
      this.rootElement.remove();
      // 加载或初始化游戏数据
      storage.load(() => auth.init());
    };

    document.body.removeAttribute("style");
    this.rootElement.addEventListener("click", loadHandler);
  },
};

export default loading;
