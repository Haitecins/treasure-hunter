import cache from "./cache";
import ticks from "../modules/ticks";
import entities from "../modules/entities";
import navigate from "../modules/navigate";

(() => {
  if (import.meta.env.PROD) return;
  // 重置localStorage
  Object.defineProperty(window, "cls", {
    value() {
      // 清除本地存储以及刷新页面
      localStorage.clear();
      location.reload();
    },
  });
  // 将计时变为1秒
  Object.defineProperty(window, "timer", {
    value() {
      ticks.timer = 1;
      return "已将计时设为1秒";
    },
  });
  // 快速生成实体
  Object.defineProperty(window, "summon", {
    value() {
      for (let i = 0; i < 50; i++) {
        // 生成实体并移动
        navigate(entities.create());
      }
      return "已生成数量为50的实体";
    },
  });
  // 全局暴露缓存(cache)模块
  Object.defineProperty(window, "global", {
    value: cache,
  });
  // 设置累计破坏9999个字符
  Object.defineProperty(window, "chars", {
    value() {
      cache.props.BREAK_CHARS += 9999;
      return "已将累计破坏字符的个数设为9999个";
    },
  });
})();
