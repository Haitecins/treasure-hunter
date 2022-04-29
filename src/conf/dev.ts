import tickModule from "../modules/ticks";
import entities from "../modules/entities";
import navigate from "../modules/navigate";

// 重置localStorage
Object.defineProperty(window, "cls", {
  value() {
    if (import.meta.env.PROD) return;
    // 清除本地存储以及刷新页面
    localStorage.clear();
    location.reload();
  },
});

// 将计时变为1秒
Object.defineProperty(window, "ttk", {
  value() {
    if (import.meta.env.PROD) return;
    tickModule.timer = 1;
    return "已将计时设为1秒";
  },
});

// 快速生成实体
Object.defineProperty(window, "summon", {
  value() {
    if (import.meta.env.PROD) return;
    for (let i = 0; i < 50; i++) {
      // 生成实体并移动
      navigate(entities.create());
    }
    return "已生成数量为50的实体";
  },
});
