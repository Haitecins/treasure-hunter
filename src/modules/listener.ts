import anime from "animejs";
import entities, { Entity } from "./entities";
import cache from "../conf/cache";
import logger from "../components/logger";
import quests from "./quests";

const activeCharHandler = (el: Entity) => {
  const { provides } = cache;

  // 防止重复执行
  el.isActive = !el.isActive;
  // 停止路线动画
  el.tracker.pause();
  // 执行消失动画
  anime({
    targets: el,
    duration: 250,
    scale: 0,
    easing: "easeInOutQuad",
    begin() {
      // 更新一次任务目标
      quests.update();
      // 有概率获得铜锭x1-3
      if (anime.random(0, 100) <= 65) {
        provides.COPPER_COUNT += anime.random(1, 3);
      }
      // 有概率获得铁锭x1-2
      if (anime.random(0, 100) <= 40) {
        provides.IRON_COUNT += anime.random(1, 2);
      }
      // 有概率获得金锭x1
      if (anime.random(0, 100) <= 5) {
        provides.GOLD_COUNT += 1;
      }
    },
    complete() {
      el.remove();
    },
  });
};
const keyDownHandler = (ev: KeyboardEvent) => {
  document.onkeydown = null;
  const children = <Entity[]>(
    Array.prototype.slice.call(entities.container.children)
  );

  children.forEach((el) => {
    const { activeKey, isActive } = el;

    !isActive &&
      ev.key.toLowerCase() === activeKey.toLowerCase() &&
      activeCharHandler(el);
  });
};
const listener = {
  enable() {
    logger("Listener", "开启键盘监听器");
    document.onkeydown = keyDownHandler;
    document.onkeyup = () => (document.onkeydown = keyDownHandler);
  },
  disable() {
    logger("Listener", "关闭键盘监听器");
    document.onkeydown = document.onkeyup = null;
  },
};

export default listener;
export { activeCharHandler };
