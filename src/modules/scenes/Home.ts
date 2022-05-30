import { Profile } from "../users";
import { querySelector } from "@/components/selector";
import { hideModule, showModule } from "@/components/displaying";

const Home: HomeModuleProps = {
  rootElement: querySelector("#home-scene"),
  startElement: querySelector("#home-start"),
  show() {
    showModule(this.rootElement, "Home", {
      begin: () => {
        // 更新Profile模块
        Profile.updateBar();
      },
    });
  },
  hide(animeBeginCallback, animeCompleteCallback) {
    hideModule(this.rootElement, "Home", {
      begin: animeBeginCallback,
      complete: animeCompleteCallback,
    });
  },
};

type HomeModuleProps = {
  readonly rootElement: Element;
  readonly startElement: Element;
  show(): void;
  hide(
    animeBeginCallback?: () => void,
    animeCompleteCallback?: () => void
  ): void;
};

export default Home;
export { HomeModuleProps };
