import tickModule from "../modules/ticks";

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
    tickModule.ticker = 1;
    return "已将计时设为1秒";
  },
});
