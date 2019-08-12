export interface Rule {
  readonly columnName: string;
  readonly description?: string;
  readonly failCode?: number;
}
