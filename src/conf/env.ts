import cache from "./cache";
import ticks from "../modules/ticks";
import entities, { Entity } from "../modules/entities";
import { activeCharHandler } from "../modules/listener";
import route from "../modules/route";

// 开发环境功能配置
if (import.meta.env.MODE === "development") {
  // 全局暴露缓存(cache)模块
  Object.defineProperty(window, "_cache", {
    value: cache,
  });
  // 修改计时
  Object.defineProperty(window, "_timer", {
    value(t: number) {
      const ts = t || 1;

      ticks.timer = ts;
      return `已将计时设为${ts}秒`;
    },
  });
  // 快速生成字块
  Object.defineProperty(window, "_summon", {
    value(amount: number) {
      const amounts = amount || 20;

      for (let i = 0; i < amounts; i++) {
        // 生成字块并移动
        route(entities.spawner());
      }
      return `已生成数量为${amounts}的字块`;
    },
  });
  // 增加累计破坏的字块个数
  Object.defineProperty(window, "_chars", {
    value(amount: number) {
      const amounts = amount || 100;

      cache.provides.BREAK_CHARS += amounts;
      return `增加了${amounts}个累计破坏字块的个数`;
    },
  });
  // 强制激活区域内所有的字块
  Object.defineProperty(window, "_activate", {
    value() {
      (<Entity[]>(
        Array.prototype.slice.call(entities.container.children)
      )).forEach((child) => activeCharHandler(child));
      return "强制激活了区域内的字块";
    },
  });
}

// 开发&生产环境功能配置
Object.defineProperty(window, "th_reset", {
  value() {
    // 清除本地存储以及刷新页面
    localStorage.clear();
    location.reload();
    return "已重置本地数据";
  },
});
