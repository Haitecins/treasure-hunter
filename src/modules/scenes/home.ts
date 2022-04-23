import anime from "animejs";
import chunk from "./chunk";
import listener from "../listener";
import ticks from "../ticks";
import account from "../account";

const homeObject = {
  modal: document.querySelector("#home-modal")!,
  start: document.querySelector("#home-start")!,
  show() {
    console.log("正在加载Home模块");
    anime({
      targets: this.modal,
      opacity: [0, 1],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        // 更新Account模块
        account.update();
        this.modal.classList.remove("hidden");
      },
      // 加载完成后添加按钮事件
      complete: () => {
        console.log("Home模块显示");

        const clickHandler = () => {
          this.start.removeEventListener("click", clickHandler);
          // 隐藏Home模块
          this.hide(() => {
            // 载入游戏
            chunk.play();
            // 开启键盘监听器
            listener.enable();
            // 开启计时
            ticks.start();
          });
        };

        this.start.addEventListener("click", clickHandler);
      },
    });
  },
  hide(animeComplete: () => void) {
    anime({
      targets: this.modal,
      opacity: [1, 0],
      duration: 200,
      easing: "easeInOutSine",
      complete: () => {
        this.modal.classList.add("hidden");
        console.log("Home模块隐藏");
        animeComplete();
      },
    });
  },
};

export default homeObject;
