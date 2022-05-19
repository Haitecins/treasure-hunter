module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    backgroundImage: {
      barrier: 'url("/src/assets/icons/barrier.png")',
      cancel: 'url("/src/assets/icons/cancel.png")',
      comparator: 'url("/src/assets/icons/comparator.png")',
      copper_ingot: 'url("/src/assets/icons/copper_ingot.png")',
      gold_ingot: 'url("/src/assets/icons/gold_ingot.png")',
      emerald: 'url("/src/assets/icons/emerald.png")',
      iron_ingot: 'url("/src/assets/icons/iron_ingot.png")',
      nether_star: 'url("/src/assets/icons/nether_star.png")',
      ok: 'url("/src/assets/icons/ok.png")',
      paper: 'url("/src/assets/icons/paper.png")',
      writable_book: 'url("/src/assets/icons/writable_book.png")',
    },
    extend: {
      colors: {
        // 用于文字的颜色
        "th-black": "#252423",
        "th-white": "#F6F4F2",
        "th-lightgrey": "#BDBDBD",
        "th-grey": "#424242",
        "th-red": "#FF4B4B",
        "th-blue": "#61C3FF",
        "th-yellow": "#FBF38C",
        "th-mask": "rgba(0,0,0,0.65)",
        // 用于字块的颜色
        "th-char-common": "#ecf0f1",
        "th-char-rare": "#3498db",
        "th-char-epic": "#8e44ad",
        "th-char-legendary": "#f39c12",
        "th-char-omega": "#2ecc71",
        "th-char-unique": "#c0392b",
      },
      fontFamily: {
        sans: ['"en"', '"cn"', "sans-serif"],
        serif: ['"en"', '"cn"', "serif"],
      },
      spacing: {
        144: "33rem",
        192: "44rem",
      },
    },
  },
  plugins: [],
};
