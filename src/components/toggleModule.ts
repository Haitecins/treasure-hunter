const toggleModule: ToggleModuleType = (targets, opening, closing) => {
  const openHandler = () => {
    // 移除打开设置事件
    targets.open.removeEventListener("click", openHandler);
    // 添加关闭设置事件
    targets.close.addEventListener("click", closeHandler);
    // 打开时做的事情
    opening();
  };
  const closeHandler = () => {
    // 移除关闭设置事件
    targets.close.removeEventListener("click", closeHandler);
    // 添加打开设置事件
    targets.open.addEventListener("click", openHandler);
    // 关闭时做的事情
    closing();
  };

  // 初始化绑定打开设置按钮的事件
  targets.open.addEventListener("click", openHandler);

  return openHandler;
};

type ToggleModuleType = (
  targets: {
    open: Element;
    close: Element;
  },
  opening: () => void,
  closing: () => void
) => () => void;

export default toggleModule;
