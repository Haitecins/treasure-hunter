import localstorage from "../utils/localstorage";

const accountObject = {
  info_modal: document.querySelector("#account-info-modal")!,
  update() {
    this.info_modal.innerHTML = `${localstorage.get().name} / Lv.${
      localstorage.get().levels
    }`;
  },
};

export default accountObject;
