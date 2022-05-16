import logger from "../../components/logger";
import entities from "../entities";
import listener from "../listener";
import { querySelector } from "../../components/querySelector";

const chunk = {
  rootElement: querySelector("#chunk-scene"),
  play() {
    this.rootElement.classList.remove("hidden");
    logger("Chunk", "载入模块");

    // 启用字块生成模块
    entities.enable();
  },
  hide() {
    this.rootElement.classList.add("hidden");
    logger("Chunk", "已隐藏");
  },
  clear() {
    // 销毁字块生成模块
    entities.destroy();
    // 关闭键盘监听器
    listener.disable();
    logger("Chunk", "模块清理");
  },
};

export default chunk;
