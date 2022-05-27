import entities from "../entities";
import listener from "../listener";
import logger from "@/components/logger";
import { querySelector } from "@/components/querySelector";
import { hideModule, showModule } from "@/components/moduleDisplay";

const Chunk = {
  rootElement: querySelector("#chunk-scene"),
  play() {
    showModule.now(this.rootElement, "Chunk", () => {
      // 启用字块生成模块
      entities.enable();
    });
  },
  hide() {
    hideModule(this.rootElement, "Chunk");
  },
  clear() {
    // 销毁字块生成模块
    entities.destroy();
    // 关闭键盘监听器
    listener.disable();
    logger("Chunk", "模块清理");
  },
};

export default Chunk;
