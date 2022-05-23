import anime from "animejs";

const colors = {
  list: [
    ["bg-th-char-turquoise", "text-th-white"],
    ["bg-th-char-green-sea", "text-th-white"],
    ["bg-th-char-emerald", "text-th-white"],
    ["bg-th-char-nephritis", "text-th-white"],
    ["bg-th-char-peter-river", "text-th-white"],
    ["bg-th-char-belize-hole", "text-th-white"],
    ["bg-th-char-amethyst", "text-th-white"],
    ["bg-th-char-wisteria", "text-th-white"],
    ["bg-th-char-wet-asphalt", "text-th-white"],
    ["bg-th-char-midnight-blue", "text-th-white"],
    ["bg-th-char-sun-flower", "text-th-black"],
    ["bg-th-char-orange", "text-th-white"],
    ["bg-th-char-carrot", "text-th-white"],
    ["bg-th-char-pumpkin", "text-th-white"],
    ["bg-th-char-alizarin", "text-th-white"],
    ["bg-th-char-clouds", "text-th-black"],
    ["bg-th-char-silver", "text-th-black"],
    ["bg-th-char-concrete", "text-th-white"],
    ["bg-th-char-asbestos", "text-th-white"],
  ],
  random() {
    const i = anime.random(0, this.list.length - 1);

    return this.list[i];
  },
};

export default colors;
