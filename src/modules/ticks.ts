import anime from "animejs";
import chunk from "./scenes/chunk";

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
          this.animeInstance.restart();
          this.animeInstance.pause();
          // 重置计时
          this.reset();
          // 清理Chunk模块
          chunk.clear();
        });
      },
    });
  },
  reset() {
    this.seconds = 30;
    console.log("计时已重置");
  },
};

export default tickModule;
