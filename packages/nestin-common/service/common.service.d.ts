import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from 'nestjs-config';
export declare class CommonService<T> extends TypeOrmCrudService<T> {
    protected logger: Logger;
    protected readonly configService: ConfigService;
    constructor(repo: Repository<T>);
    findOrCreate(info: DeepPartial<T>): Promise<[T, boolean]>;
    updateEntity(entity: number | T, info: DeepPartial<T>): Promise<T>;
    getOnly(): Promise<T>;
    updateOnly(entity: T): Promise<{} & T>;
    deleteAll(): Promise<void>;
}
