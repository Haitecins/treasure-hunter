import anime from "animejs";
import scene from "./scenes";

const tickModule = {
  rootElement: document.querySelector("#ticks-module")!,
  animeInstance: <anime.AnimeInstance>{},
  seconds: 30,
  start() {
    console.log("计时开始");
    // 清空上一个tick计时内容
    this.rootElement.innerHTML = "";
    const convert = (sec: number, callback: () => void) => {
      let m: string | number = Math.floor(sec / 60);
      let s: string | number = sec % 60;
      m = m < 10 ? `0${m}` : m;
      s = s < 10 ? `0${s}` : s;

      if (sec > 0) {
        return `${m}:${s}`;
      } else {
        callback?.();
        return "时间到！";
      }
    };
    this.animeInstance = anime({
      loop: true,
      duration: 1000,
      loopBegin: () => {
        this.rootElement.innerHTML = convert(this.seconds--, () => {
          console.log("时间到！");
          // 停止计时
          this.stop();
          // 重置计时
          this.reset();
          // 清理Chunk模块
          scene.chunk.clear();
          anime({
            duration: 1000,
            complete: () => {
              // 隐藏Chunk模块
              scene.chunk.hide();
              // 加载Ending模块
              scene.ending.show();
              this.rootElement.innerHTML = "";
            },
          });
        });
      },
    });
  },
  stop() {
    this.animeInstance.restart();
    this.animeInstance.pause();
    console.log("计时停止");
  },
  reset() {
    this.seconds = 30;
    console.log("已重置计时");
  },
};

export default tickModule;
