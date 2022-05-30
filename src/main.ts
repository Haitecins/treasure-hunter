import { Howler } from "howler";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import "./styles/index.css";
import "./conf/env";
import createApp from "./modules/createApp";

// Howler.js 全局配置
Howler.volume(0.5);

// Day.js 全局配置
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

// 应用入口
createApp();
