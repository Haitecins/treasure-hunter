import anime from "animejs";
import { Entity } from "./entities";
import difficult from "./difficult";

const navigate = (el: Entity) => {
  const { clientWidth, clientHeight } = document.documentElement;
  const timeline = anime.timeline({ targets: el });
  const keyframes = [...Array(difficult.target.STEP_COUNTS)].map(() => ({
    duration: anime.random(500, 3000),
    translateX: anime.random(0, clientWidth - el.clientWidth),
    translateY: anime.random(0, clientHeight - el.clientHeight),
  }));

  // 将路线动画实例对象给tracker属性控制
  el.tracker = timeline;
  // 字块生成后改变生成的位置
  anime.set(el, {
    translateX: anime.random(0, clientWidth - el.clientWidth),
    translateY: anime.random(0, clientHeight - el.clientHeight),
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
    complete: () => el.remove(),
  });
};

export default navigate;
