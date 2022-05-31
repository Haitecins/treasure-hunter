import entities from "../entities";
import listener from "../listener";
import logger from "@/components/logger";
import { querySelector } from "@/components/selector";
import { hideModule, showModule } from "@/components/displaying";
import { RootElementType } from "@/global-types";

const Chunk: ChunkPropsType = {
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

type ChunkMethodsType = {
  play(): void;
  hide(): void;
  clear(): void;
};
type ExtendsType = ChunkMethodsType & RootElementType;

interface ChunkPropsType extends ExtendsType {}

export default Chunk;
export { ChunkPropsType };
