import anime from "animejs";
import scene from "../scene";
import storage from "../../libs/storage";
import logger from "../../components/logger";
import user from "../user";

const auth = {
  rootElement: document.querySelector("#auth-module")!,
  confirm: document.querySelector("#auth-confirm")!,
  tip: document.querySelector("#auth-tip")!,
  input: <HTMLInputElement>document.querySelector("#auth-input"),
  isLogin: document.querySelector("#is-login")!,
  welcomeBar: document.querySelector("#welcome-bar")!,
  load() {
    const { rootElement, confirm, tip, input } = this;
    // 命名处理程序
    const loginHandler = () => {
      if (input.value === "" || input.value.trim() === "") {
        tip.innerHTML = "名称不能为空！";
      } else if (input.value.length > 15) {
        tip.innerHTML = "名称的长度不能超过10个字符！";
      } else {
        storage.save((data) => {
          data.name = input.value.trim();
        });
        this.success();
      }
    };

    anime({
      targets: rootElement,
      duration: 1000,
      translateY: [-600, 0],
      begin: () => {
        // 显示命名模块
        this.isLogin.classList.remove("hidden");
      },
    });
    confirm.addEventListener("click", loginHandler);
    input.addEventListener("keydown", (ev) => {
      tip.innerHTML = "";
      ev.code === "Enter" && loginHandler();
    });
  },
  success() {
    const { clientHeight } = document.documentElement;
    const timeline = anime.timeline({
      targets: this.rootElement,
    });

    // 修改标题栏
    document.title += ` (${storage.get().name})`;
    // 修改欢迎消息
    this.welcomeBar.querySelector("h1")!.innerHTML = `欢迎回来，${
      storage.get().name
    }！`;
    // 为欢迎消息添加动画
    timeline.add({
      duration: 1000,
      translateY: [clientHeight, 0],
      begin: () => {
        // 显示欢迎消息
        this.welcomeBar.classList.remove("hidden");
      },
    });
    timeline.add({
      opacity: 0,
      duration: 500,
      easing: "easeInOutQuad",
      complete: () => {
        // 删除Auth模块
        this.rootElement.remove();
        // 显示Home模块
        scene.home.show();
        // 初始化Personal模块
        user.personal.init();
      },
    });
  },
  init() {
    // 显示Auth模块
    this.rootElement.classList.remove("hidden");
    if (!storage.get().name) {
      logger("Auth", "载入模块");
      this.load();
    } else {
      logger("Auth", "验证通过");
      this.success();
    }
  },
};

export default auth;
