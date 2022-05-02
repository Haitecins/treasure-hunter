import logger from "../components/logger";

interface Metadata {
  pid: number;
  name: any;
  levels: number;
  historyBreak: number;
  version: string;
  balances: {
    copper: number;
    iron: number;
    gold: number;
  };
}

const db_key = "th_storage";
const temp_key = "th_temp_storage";
const metadata: Metadata = {
  pid: new Date().getTime(),
  name: null,
  levels: 1,
  historyBreak: 0,
  balances: {
    copper: 0,
    iron: 0,
    gold: 0,
  },
  version: "1.0",
};
/**
 * 从浏览器中加载游戏数据，没有则初始化数据。
 */
const load = (callback?: () => void) => {
  if (!localStorage[db_key]) {
    localStorage[db_key] = JSON.stringify(metadata);
    logger("Localstorage", "Init...");
  } else {
    logger("Localstorage", "Loading...");
  }
  Object.defineProperty(window, temp_key, {
    value: JSON.parse(localStorage[db_key]),
  });
  // 当数据加载完成后需要做的事
  callback?.();
};

/**
 * 保存当前进度
 * @param callback 修改临时进度的回调，可以进行临时进度的修改，回调执行完后会保存当前进度。
 */
const save = (callback?: (data: Metadata) => void) => {
  const db_temp = <Metadata>(<any>window)[temp_key];

  try {
    callback?.(db_temp);
    localStorage[db_key] = JSON.stringify(db_temp);
    console.group("本地存储");
    logger("Localstorage", "数据已保存！");
    console.table(db_temp);
    console.groupEnd();
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取当前临时进度对象
 */
const get = () => {
  return <Metadata>(<any>window)[temp_key];
};

export default { load, save, get };
