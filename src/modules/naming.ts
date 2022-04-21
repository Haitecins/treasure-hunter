import anime from "animejs";
import scene from "./scene";
import localstorage from "../utils/localstorage";

const namingObject = {
  modal: document.querySelector("#name-modal")!,
  confirm: document.querySelector("#name-confirm")!,
  tip: document.querySelector("#name-tip")!,
  input: <HTMLInputElement>document.querySelector("#name-input"),
  isNaming: document.querySelector("#is-naming")!,
  welcomeBar: document.querySelector("#welcome-bar")!,
};

// 显示欢迎消息的功能
const showWelcomeBar = () => {
  const { modal, isNaming, welcomeBar } = namingObject;
  const timeline = anime.timeline({
    targets: modal,
  });

  isNaming.remove();
  welcomeBar.querySelector("h1")!.innerHTML = `欢迎回来，${
    localstorage.get().name
  }！`;
  welcomeBar.classList.remove("hidden");
  timeline.add({
    duration: 1000,
    translateY: [450, 0],
  });
  timeline.add({
    opacity: 0,
    duration: 500,
    easing: "easeInOutQuad",
    complete() {
      // 删除naming模块
      modal.remove();
      // 显示Home模块
      scene.home.show();
    },
  });
};

if (!localstorage.get().name) {
  const { modal, confirm, tip, input } = namingObject;
  // 命名处理程序
  const namingHandler = () => {
    if (input.value === "" || input.value.trim() === "") {
      tip.innerHTML = "名称不能为空！";
    } else if (input.value.length > 15) {
      tip.innerHTML = "名称的长度不能超过10个字符！";
    } else {
      localstorage.save((data) => {
        data.name = input.value.trim();
      });
      showWelcomeBar();
    }
  };

  anime({
    targets: modal,
    duration: 1000,
    translateY: [-600, 0],
  });
  confirm.addEventListener("click", namingHandler);
  input.addEventListener("keydown", (ev) => {
    tip.innerHTML = "";
    ev.code === "Enter" && namingHandler();
  });
} else {
  showWelcomeBar();
}

export default namingObject;
