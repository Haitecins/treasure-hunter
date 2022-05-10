import logger from "../../components/logger";
import entities from "../entities";
import listener from "../listener";
import query from "../../components/query";

const chunk = {
  rootElement: query<Element>("#chunk-scene"),
  play() {
    this.rootElement.classList.remove("hidden");
    logger("Chunk", "载入模块");
    // 启用实体生成模块
    entities.enable();
  },
  hide() {
    this.rootElement.classList.add("hidden");
    logger("Chunk", "已隐藏");
  },
  clear() {
    // 销毁实体模块
    entities.destroy();
    // 关闭键盘监听器
    listener.disable();
    logger("Chunk", "模块清理");
  },
};

export default chunk;
