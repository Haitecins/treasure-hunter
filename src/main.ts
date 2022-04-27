import "./assets/styles/index.css";
import localstorage from "./utils/localstorage";
import auth from "./modules/users/auth";

// 开发者模式功能，不会将代码构建到生产环境。
import "./conf/dev";

// 加载或初始化游戏数据
localstorage.load(auth.init);

// 在依赖文件加载完成后显示界面
document.body.removeAttribute("style");
