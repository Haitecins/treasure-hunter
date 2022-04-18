const metadata = {
  pid: 1,
  player: "Player",
};
const db_key = "th_storage";
const db_name = "th_db";
/**
 * 从浏览器中加载游戏数据，没有则初始化数据。
 */
const load = () => {
  if (localStorage.getItem(db_key)) {
    Object.defineProperty(window, db_name, {
      value: JSON.parse(localStorage.getItem(db_key)!),
    });
    console.log("游戏数据已加载！");
  } else {
    localStorage.setItem(db_key, JSON.stringify(metadata));
    Object.defineProperty(window, db_name, {
      value: JSON.parse(localStorage.getItem(db_key)!),
    });
    console.log("正在初始化游戏数据。");
  }
};
/**
 * 保存当前进度
 * @param callback 修改临时进度的回调，可以进行临时进度的修改，回调执行完后会保存当前进度。
 */
const save = (callback?: (data: typeof metadata) => void) => {
  const db_temp = (window as any)[db_name] as typeof metadata;
  try {
    callback?.(db_temp);
    localStorage.setItem(db_key, JSON.stringify(db_temp));
    console.log("游戏数据已保存！", db_temp);
  } catch (e) {
    console.error(e);
  }
};

export { db_key, db_name };
export default { load, save };
