const querySelector = (selector: string) => {
  return document.querySelector(selector)!;
};
const querySelectorAll = (selector: string) => {
  return document.querySelectorAll(selector)!;
};

export { querySelector, querySelectorAll };
