import anime from "animejs";
import localstorage from "./localstorage";

const namingElements = {
  modal: document.querySelector("#name-modal")!,
  confirm: document.querySelector("#name-confirm")!,
  tip: document.querySelector("#name-tip")!,
  input: <HTMLInputElement>document.querySelector("#name-input"),
  isNaming: document.querySelector("#is-naming")!,
  welcomeBar: document.querySelector("#welcome-bar")!,
};
const { modal, confirm, tip, input, isNaming, welcomeBar } = namingElements;
const showWelcomeBar = (name: string) => {
  isNaming.remove();
  welcomeBar.querySelector("h1")!.innerHTML = `欢迎回来，${name}！`;
  welcomeBar.classList.remove("hidden");
  const timeline = anime.timeline({
    targets: modal,
  });
  timeline.add({
    duration: 1000,
    translateY: [600, 0],
  });
  timeline.add({
    opacity: 0,
    duration: 400,
    easing: "easeOutSine",
    complete() {
      modal.remove();
    },
  });
};

if (!localstorage.get().name) {
  anime({
    targets: modal,
    duration: 1000,
    translateY: [-600, 0],
  });
  confirm.addEventListener("click", () => {
    if (input.value === "") {
      tip.innerHTML = "名称不能为空！";
    } else if (input.value.length > 15) {
      tip.innerHTML = "名称的长度不能超过10个字符！";
    } else {
      localstorage.save((data) => {
        data.name = input.value;
      });
      showWelcomeBar(localstorage.get().name);
    }
  });
  input.addEventListener("input", () => {
    tip.innerHTML = "";
  });
} else {
  showWelcomeBar(localstorage.get().name);
}
