import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from 'nestjs-config';
export declare class CommonService<T> {
    readonly repo: Repository<T>;
    protected logger: Logger;
    protected readonly configService: ConfigService;
    constructor(repo: Repository<T>);
    findOrCreate(info: DeepPartial<T>): Promise<[T, boolean]>;
}
