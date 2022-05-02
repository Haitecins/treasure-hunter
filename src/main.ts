import "./assets/styles/index.css";
import localstorage from "./utils/localstorage";
import auth from "./modules/users/auth";

// 环境功能配置
import "./conf/env";

// 加载或初始化游戏数据
localstorage.load(auth.init);

// 在依赖文件加载完成后显示界面
document.body.removeAttribute("style");
