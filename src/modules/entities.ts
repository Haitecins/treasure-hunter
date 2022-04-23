import anime from "animejs";
import chars from "../utils/chars";
import colors from "./colors";
import navigate from "./navigate";

const entitiesContainer = {
  container: document.querySelector("#entities-container")!,
  animeInstance: <anime.AnimeInstance>{},
  enable() {
    console.log("Entities模块加载");
    // 生成实体
    this.animeInstance = anime({
      loop: true,
      duration: 1000,
      begin() {
        console.log("开始生成实体");
      },
      loopComplete: () => {
        // 超过20个实体则停止生成
        if (this.container.children.length >= 20) return;
        const el = this.create();

        navigate(el);
      },
    });
  },
  create() {
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
    console.log("已停止生成实体");
  },
  clear() {
    // 清空实体
    this.container.innerHTML = "";
    console.log("已清空实体");
  },
  destroy() {
    this.stop();
    this.clear();
    console.log("Entities模块销毁");
  },
};

export default entitiesContainer;
export { Entity };

interface Entity extends HTMLDivElement {
  activeKey: string;
  isActive: boolean;
  tracker: anime.AnimeInstance;
}
