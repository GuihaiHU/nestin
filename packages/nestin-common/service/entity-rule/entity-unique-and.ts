export class EntityUniqueRulesAnd {
  public constructor(
    public readonly columnNames: string[],
    public readonly description?: string,
    public readonly failCode?: number,
  ) {}
}
