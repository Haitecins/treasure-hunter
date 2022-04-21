import anime from "animejs";
import chars from "../utils/chars";
import colors from "./colors";
import navigate from "./navigate";

const entitiesObject = {
  modal: document.querySelector("#chunk-entities")!,
  animeInstance: null as unknown as anime.AnimeInstance,
  enable() {
    import.meta.env.DEV && console.log("Entities模块加载");
    import.meta.env.DEV && console.log("开始生成实体");

    // 生成实体
    this.animeInstance = anime({
      loop: true,
      duration: 1000,
      loopComplete: () => {
        // 超过20个实体则停止生成
        if (this.modal.children.length >= 20) return;
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
    this.modal.appendChild(el);

    return el;
  },
  stop() {
    // 停止生成
    this.animeInstance.restart();
    this.animeInstance.pause();
    import.meta.env.DEV && console.log("已停止生成实体");
  },
  clear() {
    // 清空实体
    this.modal.innerHTML = "";
    import.meta.env.DEV && console.log("已清空实体");
  },
  destroy() {
    this.stop();
    this.clear();
    import.meta.env.DEV && console.log("Entities模块销毁");
  },
};

export default entitiesObject;
export { Entity };

interface Entity extends HTMLDivElement {
  activeKey: string;
  isActive: boolean;
  tracker: anime.AnimeInstance;
}
