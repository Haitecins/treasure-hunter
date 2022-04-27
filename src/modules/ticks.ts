import anime from "animejs";
import scene from "./scene";
import convert from "../utils/convert";

const tickModule = {
  rootElement: document.querySelector("#ticks-module")!,
  animeInstance: <anime.AnimeInstance>{},
  ticker: 30,
  recorder: 0,
  start() {
    console.log("计时开始");
    this.animeInstance = anime({
      loop: true,
      duration: 1000,
      loopBegin: () => {
        if (this.ticker !== 0) {
          this.rootElement.innerHTML = convert(() => {
            this.recorder++;
            return this.ticker--;
          });
          console.log(this);
        } else {
          this.rootElement.innerHTML = "时间到！";
          // 停止计时
          this.stop();
          // 清理Chunk模块，移除实体/关闭监听器。
          scene.chunk.clear();
          anime({
            duration: 1000,
            complete: () => {
              // 隐藏Chunk模块
              scene.chunk.hide();
              // 加载Ending模块
              scene.ending.show();
              // 清空tick节点遗留下的内容
              this.rootElement.innerHTML = "";
            },
          });
        }
      },
    });
  },
  stop() {
    this.animeInstance.restart();
    this.animeInstance.pause();
    console.log("计时停止");
  },
  reset() {
    this.ticker = 30;
    this.recorder = 0;
    console.log("已重置计时");
  },
};

export default tickModule;
