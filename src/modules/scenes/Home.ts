import { Profile } from "../users";
import { querySelector } from "@/components/selector";
import { hideModule, showModule } from "@/components/displaying";
import { RootElementType } from "@/global-types";

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

type HomeModuleMethods = {
  show(): void;
  hide(
    animeBeginCallback?: () => void,
    animeCompleteCallback?: () => void
  ): void;
};
type InterfaceExtends = HomeModuleMethods & RootElementType;

interface HomeModuleProps extends InterfaceExtends {
  readonly startElement: Element;
}

export default Home;
export { HomeModuleProps };
