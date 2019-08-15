import { Repository } from 'typeorm';
import { RestQueryDto } from './dto/query.dto';
import { ConfigService } from 'nestjs-config';
import { Logger, Inject } from '@nestjs/common';

export class RestService<T> {
  private condition2symbol = {
    eq: '=',
    ne: '<>',
    gt: '>',
    gte: '>=',
    lt: '<',
    lte: '<=',
  };
  private restServiceOptions = {}
  protected logger = new Logger();

  @Inject(ConfigService)
  protected readonly configService: ConfigService;

  constructor(readonly repo: Repository<T>) {
    this.restServiceOptions = Object.assign({
      allow: [],
      exclude: [],
      persist: [],
      filter: [],
      join: [],
      sort: [],
      limit: 10,
      maxLimit: 1000,
      cache: false,
    }, this.restServiceOptions)
  }

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

  async getMany(dto: RestQueryDto): Promise<[T[], number]> {
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

  async getOne(id: number | string, dto: RestQueryDto) {
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

  async updateOne(id, entity) {

  }

  async patchOne(id, entity) {
    
  }

  async deleteOne(id) {
    
  }

  async findOne(o: any, a: any) {}
}
