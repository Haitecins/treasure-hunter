import cache from "./cache";
import ticks from "../modules/ticks";
import entities, { Entity } from "../modules/entities";
import { activeCharHandler } from "../modules/listener";
import navigate from "../modules/navigate";

// 配置功能
((env) => {
  console.log(import.meta.env.MODE);
  if (env === "development") {
    // 全局暴露缓存(cache)模块
    Object.defineProperty(window, "_cache", {
      value: cache,
    });
    // 重置localStorage
    Object.defineProperty(window, "_cls", {
      value() {
        // 清除本地存储以及刷新页面
        localStorage.clear();
        location.reload();
        return "已重置本地数据";
      },
    });
    // 修改计时
    Object.defineProperty(window, "_timer", {
      value(t: number) {
        const ts = t || 1;

        ticks.timer = ts;
        return `已将计时设为${ts}秒`;
      },
    });
    // 快速生成实体
    Object.defineProperty(window, "_summon", {
      value(amount: number) {
        const amounts = amount || 20;

        for (let i = 0; i < amounts; i++) {
          // 生成实体并移动
          navigate(entities.spawn());
        }
        return `已生成数量为${amounts}的实体`;
      },
    });
    // 增加累计破坏的字符个数
    Object.defineProperty(window, "_chars", {
      value(amount: number) {
        const amounts = amount || 100;

        cache.props.BREAK_CHARS += amounts;
        return `增加了${amounts}个累计破坏字符的个数`;
      },
    });
    // 强制激活区域内所有的字符
    Object.defineProperty(window, "_activate", {
      value() {
        (<Entity[]>(
          Array.prototype.slice.call(entities.container.children)
        )).forEach((child) => activeCharHandler(child));
        return "强制激活了区域内的字符";
      },
    });
  }
})(import.meta.env.MODE);
