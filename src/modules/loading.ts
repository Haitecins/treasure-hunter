import localstorage from "../utils/localstorage";
import auth from "./users/auth";
import soundtracks from "../providers/soundtracks";

const loading = {
  rootElement: document.querySelector("#loading")!,
  init() {
    const loadHandler = () => {
      this.rootElement.removeEventListener("click", loadHandler);
      this.rootElement.remove();
      // 播放音乐
      soundtracks.scenes.play();
      // 加载或初始化游戏数据
      localstorage.load(() => auth.init());
    };

    document.body.removeAttribute("style");
    this.rootElement.addEventListener("click", loadHandler);
  },
};

export default loading;
