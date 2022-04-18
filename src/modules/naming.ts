import localstorage from "./localstorage";

const namingElements = {
  modal: document.querySelector("#name-modal")!,
  ok: document.querySelector("#name-ok")!,
  tip: document.querySelector("#name-tip")!,
  input: <HTMLInputElement>document.querySelector("#name-input"),
};
const { modal, ok, tip, input } = namingElements;

if (!localstorage.get().name) {
  ok.addEventListener("click", () => {
    if (input.value === "") {
      tip.innerHTML = "名称不能为空！";
    } else if (input.value.length > 10) {
      tip.innerHTML = "名称的长度不能超过10个字符！";
    } else {
      localstorage.save((data) => {
        data.name = input.value;
      });
      modal.remove();
    }
  });
  input.addEventListener("input", () => {
    tip.innerHTML = "";
  });
} else {
  modal.remove();
}
