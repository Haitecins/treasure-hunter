function query<T>(selector: string) {
  if (document.querySelectorAll(selector).length === 1) {
    return <T>(<unknown>document.querySelector(selector));
  } else {
    return <T>(<unknown>document.querySelectorAll(selector));
  }
}

export default query;
