const convert = (handler: ConvertHandler | number) => {
  let t: number;

  if (typeof handler === "function") {
    t = handler();
  } else {
    t = handler;
  }
  let m: string | number = Math.floor(t / 60);
  let s: string | number = t % 60;

  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  return `${m}:${s}`;
};

type ConvertHandler = () => number;

export default convert;
