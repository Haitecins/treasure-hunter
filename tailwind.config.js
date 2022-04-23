module.exports = {
  content: [
    "./index.html",
    "./src/modules/**/*.{js,ts}",
    "./src/utils/**/*.{js,ts}",
  ],
  theme: {
    backgroundImage: {
      "bal-copper-ingot": 'url("/src/assets/icons/copper_ingot.png")',
      "bal-iron-ingot": 'url("/src/assets/icons/iron_ingot.png")',
      "bal-gold-ingot": 'url("/src/assets/icons/gold_ingot.png")',
      "writable-book": 'url("/src/assets/icons/writable_book.png")',
    },
    extend: {
      colors: {
        "th-black": "#252423",
        "th-grey": "rgba(255,255,255,.15)",
        "th-dark": "rgba(0,0,0,.65)",
        "th-white": "#F6F4F2",
        "th-err": "#FF4B4B",
        "th-warn": "#FBF38C",
        "th-info": "#61C3FF",
        "th-orange": "#FF8F42",
        "th-yellow": "#FFC730",
        "th-light-yellow": "#F6FF56",
        "th-green": "#A4FF4F",
        "th-lime": "#18FF74",
        "th-aqua": "#3CFFEC",
        "th-light-blue": "#61C3FF",
        "th-purple": "#8453E3",
        "th-light-purple": "#5A87FF",
        "th-deep-purple": "#C26EFF",
        "th-light-pink": "#FB89FB",
      },
      fontFamily: {
        sans: ['"default"', "sans-serif"],
        serif: ['"default"', "serif"],
      },
      spacing: {
        192: "44rem",
      },
    },
  },
  plugins: [],
};
