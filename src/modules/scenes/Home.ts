import { Profile } from "../users";
import { querySelector } from "@/components/querySelector";
import { hideModule, showModule } from "@/components/moduleDisplay";

const Home = {
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
  hide(animeBeginCallback?: () => void, animeCompleteCallback?: () => void) {
    hideModule(this.rootElement, "Home", {
      begin: animeBeginCallback,
      complete: animeCompleteCallback,
    });
  },
};

export default Home;
