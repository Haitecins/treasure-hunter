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
    // 关闭键盘监听器
    listener.disable();
    // 销毁实体模块
    entities.destroy();
    console.log("已重置Chunk模块相关事件");
  },
  destroy() {
    this.hide();
    this.clear();
    console.log("Chunk模块销毁");
  },
};

export default chunkScene;
