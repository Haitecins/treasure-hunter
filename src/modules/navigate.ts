import anime from "animejs";
import { Entity } from "./entities";

const navigate = (el: Entity) => {
  const timeline = anime.timeline({
    targets: el,
  });
  const x = Math.floor(
    Math.random() * (document.body.clientWidth - el.clientWidth)
  );
  const y = Math.floor(
    Math.random() * (document.body.clientHeight - el.clientHeight)
  );

  // 将路线动画实例对象给tracker属性控制
  el.tracker = timeline;
  // 实体生成后改变其位置
  timeline.add({
    duration: 0,
    easing: "linear",
    translateX: [x, x],
    translateY: [y, y],
  });
  // 添加生成动画
  timeline.add({
    duration: 1000,
    scale: [0, 1],
    opacity: [0, 1],
  });
  // 移动动画
  timeline.add({
    duration: Math.floor(Math.random() * 5000) + 2000,
    keyframes: [
      {
        translateX: Math.floor(
          Math.random() * (document.body.clientWidth - el.clientWidth)
        ),
        translateY: Math.floor(
          Math.random() * (document.body.clientHeight - el.clientHeight)
        ),
      },
      {
        translateX: Math.floor(
          Math.random() * (document.body.clientWidth - el.clientWidth)
        ),
        translateY: Math.floor(
          Math.random() * (document.body.clientHeight - el.clientHeight)
        ),
      },
      {
        translateX: Math.floor(
          Math.random() * (document.body.clientWidth - el.clientWidth)
        ),
        translateY: Math.floor(
          Math.random() * (document.body.clientHeight - el.clientHeight)
        ),
      },
    ],
  });
  timeline.add({
    delay: 500,
    duration: 1000,
    scale: [1, 0],
    opacity: [1, 0],
    complete() {
      el.remove();
    },
  });
};

export default navigate;
