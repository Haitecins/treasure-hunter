import anime from "animejs";
import chunk from "./chunk";
import scene from "./scene";

const tickObject = {
  modal: document.querySelector("#ticks-modal")!,
  animeInstance: null as unknown as anime.AnimeInstance,
  seconds: 30,
  start() {
    import.meta.env.DEV && console.log("计时开始");
    // 清空上一个tick计时内容
    this.modal.innerHTML = "";
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
        this.modal.innerHTML = convert(this.seconds--, () => {
          import.meta.env.DEV && console.log("时间到！");
          this.animeInstance.restart();
          this.animeInstance.pause();
          // 计时已重置
          this.reset();
          // 清理游戏区域
          chunk.destroy();
          // 显示Home模块
          scene.home.show();
        });
      },
    });
  },
  reset() {
    this.seconds = 30;
    import.meta.env.DEV && console.log("计时已重置");
  },
};

export default tickObject;
