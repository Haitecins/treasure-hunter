import anime from "animejs";
import logger from "../components/logger";
import chars from "../utils/chars";
import cache from "../conf/cache";
import colors from "../utils/colors";
import navigate from "./navigate";
import difficult from "./difficult";
import { querySelector } from "../components/querySelector";

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
        navigate(this.spawn());
      },
    });
  },
  spawn: function () {
    let quality: string[];
    let activeAward: Entity["activeAward"];
    const { provides } = cache;
    const el = <Entity>document.createElement("div");
    const char = chars.random().toUpperCase();
    const [common, rare, epic, legendary, omega, unique] = colors.list;
    const chance = (x: number) => anime.random(0, 100) <= x;

    if (chance(10)) {
      quality = unique;
      activeAward = () => {
        provides.COPPER_COUNT += 5;
        provides.IRON_COUNT += 4;
        provides.GOLD_COUNT += 1;
      };
    } else if (chance(10)) {
      quality = omega;
      activeAward = () => {
        provides.COPPER_COUNT += anime.random(4, 5);
        provides.IRON_COUNT += anime.random(2, 3);
        provides.GOLD_COUNT += anime.random(0, 1);
      };
    } else if (chance(10)) {
      quality = legendary;
      activeAward = () => {
        provides.COPPER_COUNT += anime.random(3, 4);
        provides.IRON_COUNT += anime.random(1, 2);
      };
    } else if (chance(10)) {
      quality = epic;
      activeAward = () => {
        provides.COPPER_COUNT += anime.random(2, 3);
        provides.IRON_COUNT += anime.random(0, 1);
      };
    } else if (chance(10)) {
      quality = rare;
      activeAward = () => {
        provides.COPPER_COUNT += anime.random(1, 2);
      };
    } else {
      quality = common;
      activeAward = () => {
        provides.COPPER_COUNT += 1;
      };
    }
    el.classList.add(...quality, "th-entity");
    el.innerHTML = el.activeKey = char;
    el.isActive = false;
    el.activeAward = activeAward;
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
