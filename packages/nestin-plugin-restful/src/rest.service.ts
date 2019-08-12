import { Repository } from 'typeorm';

import { QueryDto } from 'nestin-common/restful/query.dto';

export class RestService<T> {
  condition2symbol = {
    eq: '=',
    ne: '<>',
    gt: '>',
    gte: '>=',
    lt: '<',
    lte: '<=',
  };

  constructor(readonly repo: Repository<T>) {}

  parseFilters(filters: string[] | string): any {
    if (!filters) {
      return [];
    }
    const result = {};
    if (typeof filters === 'string') {
      filters = [filters];
    }
    for (let i = 0; i < filters.length; i++) {
      const [key, condition, value] = filters[i].split('||');
      if (value) {
        result[`a.${key} ${this.condition2symbol[condition]} :value${i}`] = [i, value];
      }
    }
    return result;
  }

  async getMany(dto: QueryDto): Promise<[T[], number]> {
    const filters = this.parseFilters(dto.filters);
    const query = this.repo.createQueryBuilder('a');

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        query.andWhere(key, { [`value${filters[key][0]}`]: filters[key][1] });
      }
    }
    if (dto.join) {
      (dto.join as any) = dto.join.split(',');
      for (const join of dto.join) {
        query.leftJoinAndSelect(`a.${join}`, `${join}`);
      }
    }
    if (dto.sort) {
      const sortInfo = dto.sort.split(',');
      if (sortInfo.length === 1) {
        sortInfo.push('ASC');
      }
      sortInfo[0] = `a.${sortInfo[0]}`;
      query.orderBy(sortInfo[0], sortInfo[1] as any);
    }
    dto.limit = dto.limit ? dto.limit : 10;
    query.take(dto.limit);
    if (dto.page) {
      const skip = (parseFloat(dto.page as any) - 1) * parseFloat(dto.limit as any);
      query.skip(skip);
    }
    return query.getManyAndCount();
  }

  async getOne(id: number | string, dto: QueryDto) {
    const filters = this.parseFilters(dto.filters);
    const query = this.repo.createQueryBuilder('a').where('a.id = :id', { id });
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        query.andWhere(key, { [`value${filters[key][0]}`]: filters[key][1] });
      }
    }
    return query.getOne();
  }

  async createOne(object) {
    return this.repo.save(object);
  }
}
