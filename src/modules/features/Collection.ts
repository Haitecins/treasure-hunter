import { ModuleToggleType, RootElementType } from "@/global-types";
import { querySelector } from "@/components/selector";
import switcher from "@/components/switcher";
import { hideModule, showModule } from "@/components/displaying";

const Collection: CollectionPropsType = {
  rootElement: querySelector("#collection-module"),
  detailElement: {
    module: querySelector("#collection-detail-module"),
    title: querySelector("#collection-title"),
    contents: querySelector("#collection-contents"),
  },
  closeElement: querySelector("#collection-detail-close-btn"),
  list: [
    {
      title: "冒险家宝藏",
      collections: Array(100),
    },
    {
      title: "寰宇支配者宝藏",
      collections: Array(100),
    },
  ],
  // 限制只能打开一个收藏品细节模块
  hasOpen: false,
  init() {
    this.list.forEach(({ title, collections }) => {
      const boxElem = document.createElement("div");
      const iconElem = document.createElement("i");
      const descriptionElem = document.createElement("div");
      const countElem = document.createElement("span");

      boxElem.classList.add("th-icon-module");
      iconElem.classList.add("th-icon-ref", "bg-blaze_powder");
      descriptionElem.classList.add("cursor-pointer", "flex");
      countElem.classList.add("px-2");

      countElem.innerHTML = `0/${collections.length}`;
      descriptionElem.innerText = "已收集";
      descriptionElem.appendChild(countElem);
      descriptionElem.innerHTML += title;
      switcher(
        {
          open: descriptionElem,
          close: this.closeElement,
        },
        () => {
          if (!this.hasOpen) {
            this.hasOpen = !this.hasOpen;
            this.show();
            this.render(title, collections);
          }
        },
        () => {
          if (this.hasOpen) {
            this.hasOpen = !this.hasOpen;
            this.hide();
          }
        }
      );
      boxElem.appendChild(iconElem);
      boxElem.appendChild(descriptionElem);
      this.rootElement.appendChild(boxElem);
    });
  },
  show() {
    showModule(this.detailElement.module, "Collection");
  },
  hide() {
    hideModule(this.detailElement.module, "Collection", {
      complete: () => {
        // 关闭后清理
        this.detailElement.title.innerHTML = "";
        this.detailElement.contents.innerHTML = "";
      },
    });
  },
  render(title, collection) {
    this.detailElement.title.innerHTML = title;
    collection.forEach(({ iconClass, displayName }) => {
      const itemElem = document.createElement("div");
      const iconElem = document.createElement("i");
      const textElem = document.createElement("span");

      itemElem.classList.add("th-icon-module", "flex-col");
      iconElem.classList.add("th-icon-ref", iconClass, "mr-0", "w-10", "h-10");
      textElem.classList.add("text-xl");
      textElem.innerText = displayName;
      itemElem.appendChild(iconElem);
      itemElem.appendChild(textElem);
      this.detailElement.contents.appendChild(itemElem);
    });
  },
};

export default Collection;

type CollectionItemType = {
  id: string;
  displayName: string;
  iconClass: string;
};
type CollectionListType = {
  readonly title: string;
  readonly collections: CollectionItemType[];
}[];
type CollectionMethodsType = {
  init(): void;
  show(): void;
  hide(): void;
  render(title: string, collections: CollectionItemType[]): void;
};
type ExtendsType = RootElementType & CollectionMethodsType & ModuleToggleType;

interface CollectionPropsType extends ExtendsType {
  readonly detailElement: {
    module: Element;
    title: Element;
    contents: Element;
  };
  readonly list: CollectionListType;
  hasOpen: boolean;
}
