import anime from "animejs";
import logger from "../components/logger";
import chars from "../utils/chars";
import navigate from "./navigate";
import difficult from "./difficult";
import { querySelector } from "../components/querySelector";
import quality from "../conf/quality";

interface Entity extends HTMLDivElement {
  activeKey: string;
  isActive: boolean;
  activeAward: () => void;
  tracker: anime.AnimeInstance;
}

const entities = {
  container: querySelector("#entities-container"),
  animeInstance: <anime.AnimeInstance>{},
  enable() {
    logger("Entities", "载入模块");
    // 生成字块
    this.animeInstance = anime({
      loop: true,
      duration: difficult.target.SUMMON_SPEED,
      begin() {
        logger("Entities", "开始生成字块");
        logger(
          "Entities",
          `当前生成字块的速度为${difficult.target.SUMMON_SPEED}毫秒`
        );
      },
      loopComplete: () => {
        // 超过20个字块则停止生成
        if (this.container.children.length >= 20) return;
        const spawner = this.spawn();

        navigate(spawner);
      },
    });
  },
  spawn() {
    const el = <Entity>document.createElement("div");
    const char = chars.random().toUpperCase();
    const [qualityColor, activeHandler] = quality.get();

    el.classList.add(...qualityColor, "th-entity");
    el.innerHTML = el.activeKey = char;
    el.isActive = false;
    el.activeAward = activeHandler;
    this.container.appendChild(el);

    return el;
  },
  stop() {
    // 停止生成
    this.animeInstance.restart();
    this.animeInstance.pause();
    logger("Entities", "已停止生成字块");
  },
  clear() {
    // 清空字块
    this.container.innerHTML = "";
    logger("Entities", "已清空字块");
  },
  destroy() {
    this.stop();
    this.clear();
    logger("Entities", "模块销毁");
  },
};

export default entities;
export { Entity };
