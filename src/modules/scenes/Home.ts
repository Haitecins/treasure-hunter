import { Profile } from "../users";
import { querySelector } from "@/components/selector";
import { hideModule, showModule } from "@/components/displaying";
import { RootElementType } from "@/global-types";

const Home: HomePropsType = {
  rootElement: querySelector("#home-scene"),
  startElement: querySelector("#home-start"),
  show() {
    showModule(this.rootElement, "Home", {
      begin: () => {
        // 更新Profile模块
        Profile.updateBar();
        // TODO 需要更新Collection模块
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

type HomeMethodsType = {
  show(): void;
  hide(
    animeBeginCallback?: () => void,
    animeCompleteCallback?: () => void
  ): void;
};
type ExtendsType = HomeMethodsType & RootElementType;

interface HomePropsType extends ExtendsType {
  readonly startElement: Element;
}

export default Home;
export { HomePropsType };
