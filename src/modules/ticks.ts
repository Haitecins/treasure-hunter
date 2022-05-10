import anime from "animejs";
import scene from "./scene";
import convert from "../utils/convert";
import logger from "../components/logger";
import stages from "./stages";
import query from "../components/query";

const ticks = {
  rootElement: query<Element>("#ticks-module"),
  animeInstance: <anime.AnimeInstance>{},
  timeRecorder: 0,
  timer: 0,
  start() {
    logger("Ticks", "计时开始");
    logger("Ticks", `此次设定的时间为${stages.target.TIMER}秒`);
    // 每次开始计时前把设定的值赋值给timer计时器
    this.timer = stages.target.TIMER;
    this.animeInstance = anime({
      loop: true,
      duration: 1000,
      loopBegin: () => {
        if (this.timer <= 0) {
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
        } else {
          this.rootElement.innerHTML = convert(() => {
            this.timeRecorder++;
            return this.timer--;
          });
        }
      },
    });
  },
  stop() {
    this.animeInstance.restart();
    this.animeInstance.pause();
    logger("Ticks", "计时停止");
  },
  reset() {
    this.timeRecorder = 0;
    logger("Ticks", "已重置计时");
  },
};

export default ticks;
