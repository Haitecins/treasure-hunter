import anime from "animejs";
import { Entity } from "./entities";

const navigate = (el: Entity) => {
  const { clientWidth, clientHeight } = document.documentElement;
  const timeline = anime.timeline({ targets: el });

  // 将路线动画实例对象给tracker属性控制
  el.tracker = timeline;
  // 实体生成后改变生成的位置
  anime.set(el, {
    translateX: anime.random(0, clientWidth - el.clientWidth),
    translateY: anime.random(0, clientHeight - el.clientHeight),
  });
  // 实体出现的过渡效果
  timeline.add({
    duration: 1000,
    scale: [0, 1],
    opacity: [0, 1],
  });
  timeline.add({
    duration: anime.random(2000, 5000),
    easing: "linear",
    keyframes: [
      {
        translateX: anime.random(0, clientWidth - el.clientWidth),
        translateY: anime.random(0, clientHeight - el.clientHeight),
      },
      {
        translateX: anime.random(0, clientWidth - el.clientWidth),
        translateY: anime.random(0, clientHeight - el.clientHeight),
      },
      {
        translateX: anime.random(0, clientWidth - el.clientWidth),
        translateY: anime.random(0, clientHeight - el.clientHeight),
      },
    ],
  });
  timeline.add({
    delay: 500,
    duration: 300,
    easing: "easeInOutQuad",
    scale: [1, 0],
    opacity: [1, 0],
    complete() {
      el.remove();
    },
  });
};

export default navigate;
