import localstorage from "../utils/localstorage";
import auth from "./users/auth";

const loadingElement = document.querySelector("#loading")!;
const loadHandler = () => {
  loadingElement.removeEventListener("click", loadHandler);
  loadingElement.remove();
  // 加载或初始化游戏数据
  localstorage.load(auth.init);
};
const loading = () => {
  document.body.removeAttribute("style");
  loadingElement.addEventListener("click", loadHandler);
};

export default loading;
