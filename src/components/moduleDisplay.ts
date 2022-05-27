import anime from "animejs";
import logger from "@/components/logger";

type ModuleArguments = (
  target: Element,
  module: string,
  callbacks?: {
    begin?: () => void;
    complete?: () => void;
  }
) => void;

type NowModuleArguments = (
  target: Element,
  module: string,
  callback?: () => void
) => void;

type ModuleDisplay = ModuleArguments & { now: NowModuleArguments };

const showModule: ModuleDisplay = (
  target,
  module,
  callbacks?: {
    begin?: () => void;
    complete?: () => void;
  }
) => {
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

const hideModule: ModuleDisplay = (
  target,
  module,
  callbacks?: {
    begin?: () => void;
    complete?: () => void;
  }
) => {
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

export { showModule, hideModule };
