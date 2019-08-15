import { ConfigService } from 'nestjs-config';
export declare const redisProvider: {
    provide: string;
    useFactory: (configService: ConfigService) => any;
    inject: (typeof ConfigService)[];
};
export { Redis } from 'ioredis';
