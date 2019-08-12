import { Repository } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { EntityUniqueRulesAnd } from './entity-rule/entity-unique-and';
import { EntityUniqueRulesOr } from './entity-rule/entity-unique-or';
export declare class EntityService<T extends CommonEntity<T>> {
    protected readonly entityRepository: Repository<T>;
    constructor(entityRepository: Repository<T>);
    create(entity: any, uniqueRules?: EntityUniqueRulesAnd | EntityUniqueRulesOr): Promise<T>;
    update(entity: T | number, newEntity: any, uniqueRules?: EntityUniqueRulesAnd | EntityUniqueRulesOr): Promise<T>;
    delete(entityId: number, forceDelete?: boolean): Promise<import("typeorm").DeleteResult>;
    protected uniqueCheck(entity: any, uniqueRules: EntityUniqueRulesAnd | EntityUniqueRulesOr): Promise<void>;
    protected getEntity(entity: T | number): Promise<T>;
}
