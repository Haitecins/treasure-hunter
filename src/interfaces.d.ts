interface BalanceElementType {
  readonly balanceElement: {
    readonly copper: Element;
    readonly iron: Element;
    readonly gold: Element;
  };
}

interface RootElementType {
  readonly rootElement: Element;
}

interface ModuleToggleType {
  readonly openElement: Element;
  readonly closeElement: Element;
}

export { BalanceElementType, RootElementType, ModuleToggleType };
