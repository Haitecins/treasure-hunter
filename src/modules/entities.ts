import anime from "animejs";
import chars from "./chars";
import colors from "./colors";
import route from "./route";
import { Difficult } from "./features";
import logger from "@/components/logger";
import { querySelector } from "@/components/selector";

const entities: EntityModuleProps = {
  container: querySelector("#entities-container"),
  animeInstance: <anime.AnimeInstance>{},
  enable() {
    logger("Entities", "载入模块");
    const { SUMMON_SPEED } = Difficult.target;

    // 生成字块
    this.animeInstance = anime({
      duration: SUMMON_SPEED,
      loop: true,
      begin() {
        logger("Entities", "开始生成字块");
        logger("Entities", `当前生成字块的速度为${SUMMON_SPEED}毫秒`);
      },
      loopComplete: () => {
        // 超过20个字块则停止生成
        if (this.container.children.length >= 20) return;
        const spawn = this.spawner();

        route(spawn);
      },
    });
  },
  spawner() {
    const elem = <EntityInstance>document.createElement("div");
    const char = chars.random().toUpperCase();
    const color = colors.random();

    elem.isActive = false;
    elem.innerHTML = elem.activeKey = char;
    elem.classList.add(...color, "th-entity");
    this.container.appendChild(elem);

    return elem;
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

interface EntityInstance extends HTMLDivElement {
  activeKey: string;
  isActive: boolean;
  tracker: anime.AnimeInstance;
}

type EntityModuleProps = {
  readonly container: Element;
  animeInstance: anime.AnimeInstance;
  enable(): void;
  spawner(): EntityInstance;
  stop(): void;
  clear(): void;
  destroy(): void;
};

export default entities;
export { EntityInstance, EntityModuleProps };
