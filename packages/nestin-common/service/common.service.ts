import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository, MoreThan } from 'typeorm';
// import { RestfulOptions } from '@nestjsx/crud';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class CommonService<T> extends TypeOrmCrudService<T> {
  protected logger = new Logger();
  @Inject(ConfigService)
  protected readonly configService: ConfigService;

  constructor(repo: Repository<T>) {
    super(repo);
  }

  /**
   *
   * @param info
   */
  async findOrCreate(info: DeepPartial<T>): Promise<[T, boolean]> {
    const entity = await this.repo.findOne(info);
    if (!entity) {
      return [await this.repo.save(info), true];
    }
    return [entity, false];
  }

  async updateEntity(entity: number | T, info: DeepPartial<T>): Promise<T> {
    let e: T;
    if (isFinite(entity as any)) {
      e = await this.repo.findOneOrFail(entity as number);
    } else {
      e = entity as T;
    }
    Object.assign(e, info);
    return this.repo.save(e);
  }

  async getOnly() {
    return this.repo.findOne();
  }

  async updateOnly(entity: T) {
    const origin = await this.getOnly();
    return this.repo.save(Object.assign({}, origin, entity));
  }

  /**
   * for unittest purpose
   */
  async deleteAll() {
    if (process.env.NODE_ENV === 'test') {
      await this.repo
        .createQueryBuilder()
        .delete()
        .where('id > 0')
        .execute();
    }
  }
}
