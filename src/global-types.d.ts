type BalanceElementType = {
  readonly balanceElement: {
    readonly copper: Element;
    readonly iron: Element;
    readonly gold: Element;
  };
};
type RootElementType = {
  readonly rootElement: Element;
};
type ModuleToggleType = {
  readonly openElement?: Element;
  readonly closeElement?: Element;
};

export { BalanceElementType, RootElementType, ModuleToggleType };
