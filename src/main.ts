import "./assets/styles/index.css"; // CSS文件
import "./conf/env"; // 环境功能配置
import * as dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import createApp from "./modules/createApp";

// Day.js 全局配置
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

// 应用入口
createApp();
