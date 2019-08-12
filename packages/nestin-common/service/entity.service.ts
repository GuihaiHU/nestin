import { Equal, Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommonEntity } from '../common.entity';
import { AppException } from '../exception/app.exception';
import { EntityUniqueRulesAnd } from './entity-rule/entity-unique-and';
import { EntityUniqueRulesOr } from './entity-rule/entity-unique-or';

@Injectable()
export class EntityService<T extends CommonEntity<T>> {
  constructor(protected readonly entityRepository: Repository<T>) {}

  /**
   * 新建
   * @param entity
   * @param uniqueColumn 需要唯一的字段，例如email必须不能重复，则可传['email']
   * @param operator
   */
  async create(entity: any, uniqueRules?: EntityUniqueRulesAnd | EntityUniqueRulesOr): Promise<T> {
    if (entity.id) {
      delete entity.id;
    }
    this.uniqueCheck(entity, uniqueRules);
    return this.entityRepository.save(entity);
  }

  /**
   * 更新
   * @param entity 原数据或
   * @param newEntity
   * @param uniqueColumn
   * @param operator
   */
  async update(
    entity: T | number,
    newEntity: any,
    uniqueRules?: EntityUniqueRulesAnd | EntityUniqueRulesOr,
  ): Promise<T> {
    entity = await this.getEntity(entity);
    if (newEntity.hasOwnProperty('id')) {
      delete newEntity.id;
    }
    entity = Object.assign(entity, newEntity);
    await this.uniqueCheck(entity, uniqueRules);
    return this.entityRepository.save(entity as any);
  }

  async delete(entityId: number, forceDelete = true) {
    const entity = await this.entityRepository.findOne(entityId);
    if (!forceDelete && !entity) {
      throw new AppException('该删除对象不存在', { httpCode: 400 });
    }
    return this.entityRepository.delete(entityId);
  }

  protected async uniqueCheck(entity, uniqueRules: EntityUniqueRulesAnd | EntityUniqueRulesOr) {
    if (uniqueRules instanceof EntityUniqueRulesAnd) {
      const params = {};
      uniqueRules.columnNames.forEach(column => {
        params[column] = entity[column];
      });
      // 判断是更新还是新建
      if (entity.hasOwnProperty('id')) {
        params['id'] = Not(Equal(entity.id));
      }

      if (await this.entityRepository.count(params)) {
        throw new AppException(uniqueRules.description || `${uniqueRules.columnNames}存在唯一冲突`, {
          code: uniqueRules.failCode || 2002,
        });
      }
    }

    if (uniqueRules instanceof EntityUniqueRulesOr) {
      for (const rule of uniqueRules.rules) {
        if (!entity[rule.columnName]) {
          return;
        }
        const params = { [rule.columnName]: entity[rule.columnName] };
        // 判断是更新还是新建
        if (entity.hasOwnProperty('id')) {
          params.id = Not(Equal(entity.id));
        }
        const hitResult = await this.entityRepository.count(params);
        if (hitResult) {
          throw new AppException(rule.description || `${rule.columnName}存在唯一冲突`, { code: rule.failCode || 2002 });
        }
      }
    }
  }

  protected async getEntity(entity: T | number): Promise<T> {
    if (typeof entity === 'number') {
      return this.entityRepository.findOneOrFail(entity);
    }
    return entity;
  }
}
