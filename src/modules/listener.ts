import anime from "animejs";
import entity, { EntityInstanceProps } from "./entity";
import quests from "./quests";
import cache from "@/conf/cache";
import logger from "@/components/logger";

const activeCharHandler = (elem: EntityInstanceProps) => {
  // 如果已经激活则退出执行
  if (elem.isActive) return;
  // 防止重复执行
  elem.isActive = !elem.isActive;
  // 停止路线动画
  elem.tracker.pause();
  // 执行消失动画
  anime({
    targets: elem,
    duration: 250,
    scale: 0,
    easing: "easeInOutQuad",
    begin() {
      // 更新一次任务目标
      quests.updateTarget();
      // 有概率获得铜锭x1-4
      if (anime.random(0, 100) <= 30) {
        cache.props.copperCount += anime.random(1, 4);
      }
      // 有概率获得铁锭x1-3
      if (anime.random(0, 100) <= 15) {
        cache.props.ironCount += anime.random(1, 3);
      }
      // 有概率获得金锭x1-2
      if (anime.random(0, 100) <= 5) {
        cache.props.goldCount += anime.random(1, 2);
      }
    },
    complete() {
      elem.remove();
    },
  });
};
const keyDownHandler = (ev: KeyboardEvent) => {
  document.onkeydown = null;
  const children = entity.children();

  children.forEach((elem) => {
    const { activeKey } = elem;

    // 按下的键与字符的键对应则激活
    ev.key.toLowerCase() === activeKey.toLowerCase() && activeCharHandler(elem);
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
