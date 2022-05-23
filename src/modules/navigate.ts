import anime from "animejs";
import { Difficult } from "./features";
import { Entity } from "./entities";

const navigate = (elem: Entity) => {
  const { clientWidth, clientHeight } = document.documentElement;
  const timeline = anime.timeline({ targets: elem });
  const steps = Difficult.target.STEP_COUNTS;
  const keyframes = [...Array(steps)].map(() => ({
    duration: anime.random(500, 3000),
    translateX: anime.random(0, clientWidth - elem.clientWidth),
    translateY: anime.random(0, clientHeight - elem.clientHeight),
  }));

  // 将路线动画实例对象给tracker属性控制
  elem.tracker = timeline;
  // 字块生成后改变生成的位置
  anime.set(elem, {
    translateX: anime.random(0, clientWidth - elem.clientWidth),
    translateY: anime.random(0, clientHeight - elem.clientHeight),
  });
  // 字块出现的过渡效果
  timeline.add({
    duration: 1000,
    scale: [0, 1],
    opacity: [0, 1],
  });
  timeline.add({
    easing: "linear",
    keyframes,
  });
  timeline.add({
    delay: 500,
    duration: 300,
    easing: "easeInOutQuad",
    scale: [1, 0],
    opacity: [1, 0],
    complete: () => elem.remove(),
  });
};

export default navigate;
