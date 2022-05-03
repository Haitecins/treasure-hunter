import anime from "animejs";
import logger from "../components/logger";
import chars from "../utils/chars";
import colors from "../utils/colors";
import navigate from "./navigate";

interface Entity extends HTMLDivElement {
  activeKey: string;
  isActive: boolean;
  tracker: anime.AnimeInstance;
}

const entities = {
  container: document.querySelector("#entities-container")!,
  animeInstance: <anime.AnimeInstance>{},
  enable() {
    logger("Entities", "载入模块");
    // 生成实体
    this.animeInstance = anime({
      loop: true,
      duration: 400,
      begin() {
        logger("Entities", "开始生成实体");
      },
      loopComplete: () => {
        // 超过20个实体则停止生成
        if (this.container.children.length >= 20) return;
        const el = this.spawn();

        navigate(el);
      },
    });
  },
  spawn() {
    const el = <Entity>document.createElement("div");
    const char = chars.random().toUpperCase();
    const color = colors.random();

    el.classList.add(...color, "th-entity");
    el.innerHTML = el.activeKey = char;
    el.isActive = false;
    this.container.appendChild(el);

    return el;
  },
  stop() {
    // 停止生成
    this.animeInstance.restart();
    this.animeInstance.pause();
    logger("Entities", "已停止生成实体");
  },
  clear() {
    // 清空实体
    this.container.innerHTML = "";
    logger("Entities", "已清空实体");
  },
  destroy() {
    this.stop();
    this.clear();
    logger("Entities", "模块销毁");
  },
};

export default entities;
export { Entity };
