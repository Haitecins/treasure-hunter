const metadata: Metadata = {
  pid: new Date().getTime(),
  name: null,
  levels: 1,
  needExp: 100,
  historyBreak: 0,
  balances: {
    copper: 500,
    iron: 150,
    gold: 0,
  },
  version: 1.0,
};
const db_key = "th_storage";
const db_name = "th_db";
/**
 * 从浏览器中加载游戏数据，没有则初始化数据。
 */
const load = () => {
  if (localStorage.getItem(db_key)) {
    console.log("Loading...");
  } else {
    localStorage.setItem(db_key, JSON.stringify(metadata));
    console.log("Init...");
  }
  Object.defineProperty(window, db_name, {
    value: JSON.parse(localStorage.getItem(db_key)!),
  });
};

// 加载或初始化游戏数据
load();

/**
 * 保存当前进度
 * @param callback 修改临时进度的回调，可以进行临时进度的修改，回调执行完后会保存当前进度。
 */
const save = (callback?: (data: Metadata) => void) => {
  const db_temp = <Metadata>(<any>window)[db_name];
  try {
    callback?.(db_temp);
    localStorage.setItem(db_key, JSON.stringify(db_temp));
    console.log("Saved!", db_temp);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取当前临时进度对象
 */
const get = () => {
  return <Metadata>(<any>window)[db_name];
};

export { db_key, db_name };
export default { load, save, get };

interface Metadata {
  pid: number;
  name: any;
  levels: number;
  needExp: number;
  historyBreak: number;
  version: number;
  balances: {
    copper: number;
    iron: number;
    gold: number;
  };
}
