import logger from "@/components/logger";

const db_key = "th_storage";
const temp_key = "th_temp_storage";
const metadata: StorageMetadata = {
  pid: new Date().getTime(),
  name: null,
  levels: 1,
  history: [],
  historyBreak: 0,
  settings: {
    resolution: 16,
  },
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
    logger("Storage", "Init...");
  } else {
    logger("Storage", "Loading...");
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
const save = (callback?: (data: StorageMetadata) => void) => {
  const db_temp = <StorageMetadata>(<never>window)[temp_key];

  try {
    callback?.(db_temp);
    localStorage[db_key] = JSON.stringify(db_temp);
    console.group("本地存储");
    logger("Storage", "数据已保存！");
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
  return <StorageMetadata>(<never>window)[temp_key];
};

interface StorageMetadata {
  readonly pid: number;
  name: any;
  levels: number;
  history: {
    date: number;
    difficultLevels: number;
    breakChars: number;
    balances: {
      copper: number;
      iron: number;
      gold: number;
    };
  }[];
  historyBreak: number;
  version: string;
  settings: {
    resolution: number;
  };
  balances: {
    copper: number;
    iron: number;
    gold: number;
  };
}

export default { load, save, get };
export { StorageMetadata };
