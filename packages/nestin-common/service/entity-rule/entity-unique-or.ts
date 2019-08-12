import { Rule } from './rule';

export class EntityUniqueRulesOr {
  public constructor(public readonly rules?: Rule[]) {}
}
