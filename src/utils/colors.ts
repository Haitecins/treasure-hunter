import anime from "animejs";

const colors = {
  list: [
    ["bg-th-char-common", "text-th-black"],
    ["bg-th-char-rare", "text-th-white"],
    ["bg-th-char-epic", "text-th-white"],
    ["bg-th-char-legendary", "text-th-white"],
    ["bg-th-char-omega", "text-th-white"],
    ["bg-th-char-unique", "text-th-white"],
  ],
  random() {
    const i = anime.random(0, this.list.length - 1);

    return this.list[i];
  },
};

export default colors;
