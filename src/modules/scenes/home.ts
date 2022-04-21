import anime from "animejs";
import chunk from "../chunk";
import listener from "../listener";
import ticks from "../ticks";

const homeObject = {
  modal: document.querySelector("#home-modal")!,
  start: document.querySelector("#home-start")!,
  show() {
    import.meta.env.DEV && console.log("Home模块显示");
    this.modal.classList.remove("hidden");
    anime({
      targets: this.modal,
      opacity: [0, 1],
      duration: 200,
      easing: "easeInOutSine",
      // 加载完成后添加按钮事件
      complete: () => {
        const clickHandler = () => {
          this.start.removeEventListener("click", clickHandler);
          // 隐藏Home模块
          this.hide();
          // 载入游戏
          chunk.play();
          // 开启键盘监听器
          listener.enable();
          // 开启计时
          ticks.start();
        };

        this.start.addEventListener("click", clickHandler);
      },
    });
  },
  hide() {
    import.meta.env.DEV && console.log("Home模块隐藏");
    this.modal.classList.add("hidden");
  },
};

export default homeObject;
