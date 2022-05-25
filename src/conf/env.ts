import cache from "./cache";
import ticks from "@/modules/ticks";
import route from "@/modules/route";
import entities, { Entity } from "@/modules/entities";
import listener, { activeCharHandler } from "@/modules/listener";

// 开发环境功能配置
if (import.meta.env.MODE === "development") {
  // 暂停/继续游戏
  Object.defineProperty(window, "_pause", {
    value() {
      const chars = <Entity[]>(
        Array.prototype.slice.call(entities.container.children)
      );

      if (cache.props.isPlaying) {
        if (entities.animeInstance.paused) {
          entities.animeInstance.play();
          listener.enable();
          chars.forEach((char) => char.tracker.play());
          ticks.animeInstance.play();
          return "游戏继续";
        } else {
          entities.animeInstance.pause();
          listener.disable();
          chars.forEach((char) => char.tracker.pause());
          ticks.animeInstance.pause();
          return "游戏暂停";
        }
      } else {
        return "游戏尚未开始或已经结束！";
      }
    },
  });
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

      cache.props.breakChars += amounts;
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
