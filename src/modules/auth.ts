import anime from "animejs";
import scene from "./scenes";
import localstorage from "../utils/localstorage";

const authModule = {
  rootElement: document.querySelector("#auth-module")!,
  confirm: document.querySelector("#auth-confirm")!,
  tip: document.querySelector("#auth-tip")!,
  input: <HTMLInputElement>document.querySelector("#auth-input"),
  isLogin: document.querySelector("#is-login")!,
  welcomeBar: document.querySelector("#welcome-bar")!,
};

// 初始化模块
const init = () => {
  const { rootElement, confirm, tip, input } = authModule;
  // 命名处理程序
  const loginHandler = () => {
    if (input.value === "" || input.value.trim() === "") {
      tip.innerHTML = "名称不能为空！";
    } else if (input.value.length > 15) {
      tip.innerHTML = "名称的长度不能超过10个字符！";
    } else {
      localstorage.save((data) => {
        data.name = input.value.trim();
      });
      success();
    }
  };

  anime({
    targets: rootElement,
    duration: 1000,
    translateY: [-600, 0],
  });
  confirm.addEventListener("click", loginHandler);
  input.addEventListener("keydown", (ev) => {
    tip.innerHTML = "";
    ev.code === "Enter" && loginHandler();
  });
};
// 模块验证通过
const success = () => {
  const { clientHeight } = document.documentElement;
  const { rootElement, isLogin, welcomeBar } = authModule;
  const timeline = anime.timeline({
    targets: rootElement,
  });

  // 删除auth-modal元素
  isLogin.remove();
  // 修改标题栏
  document.title += ` (${localstorage.get().name})`;
  // 修改欢迎消息
  welcomeBar.querySelector("h1")!.innerHTML = `欢迎回来，${
    localstorage.get().name
  }！`;
  // 显示欢迎消息
  welcomeBar.classList.remove("hidden");
  // 为欢迎消息添加动画
  timeline.add({
    duration: 1000,
    translateY: [clientHeight, 0],
  });
  timeline.add({
    opacity: 0,
    duration: 500,
    easing: "easeInOutQuad",
    complete() {
      // 删除Auth模块
      rootElement.remove();
      // 显示Home模块
      scene.home.show();
    },
  });
};

if (!localstorage.get().name) {
  console.log("初始化Auth模块");
  init();
} else {
  console.log("Auth模块验证通过");
  success();
}

export default authModule;
