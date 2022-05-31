import anime from "animejs";
import logger from "@/components/logger";

const showModule: DisplayPropsType = (target, module, callbacks) => {
  anime({
    targets: target,
    opacity: [0, 1],
    duration: 250,
    easing: "easeInOutQuad",
    begin: () => {
      logger(module, "正在加载");
      target.classList.remove("hidden");
      callbacks?.begin?.();
    },
    complete() {
      logger(module, "载入模块");
      callbacks?.complete?.();
    },
  });
};
const hideModule: DisplayPropsType = (target, module, callbacks) => {
  anime({
    targets: target,
    opacity: [1, 0],
    duration: 250,
    easing: "easeInOutQuad",
    begin: () => {
      callbacks?.begin?.();
    },
    complete: () => {
      target.classList.add("hidden");
      logger(module, "已隐藏");
      callbacks?.complete?.();
    },
  });
};

showModule.now = (target, module, callback) => {
  target.classList.remove("hidden");
  (<HTMLElement>target).style.opacity = "1";
  logger(module, "载入模块");
  callback?.();
};
hideModule.now = (target, module, callback) => {
  target.classList.add("hidden");
  (<HTMLElement>target).style.opacity = "0";
  logger(module, "已隐藏");
  callback?.();
};

type PropsType = (
  target: Element,
  module: string,
  callbacks?: {
    begin?: () => void;
    complete?: () => void;
  }
) => void;
type NowPropsType = (
  target: Element,
  module: string,
  callback?: () => void
) => void;

interface DisplayPropsType extends PropsType {
  now: NowPropsType;
}

export { showModule, hideModule };
