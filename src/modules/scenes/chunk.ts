import entities from "../entities";
import listener from "../listener";

const chunkScene = {
  rootElement: document.querySelector("#chunk-scene")!,
  play() {
    this.rootElement.classList.remove("hidden");
    console.log("Chunk模块加载");
    // 启用实体生成模块
    entities.enable();
  },
  hide() {
    this.rootElement.classList.add("hidden");
    console.log("Chunk模块隐藏");
  },
  clear() {
    // 销毁实体模块
    entities.destroy();
    // 关闭键盘监听器
    listener.disable();
  },
};

export default chunkScene;
