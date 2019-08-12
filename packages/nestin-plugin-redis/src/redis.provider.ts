import * as IoRedis from 'ioredis';
import { ConfigService } from 'nestjs-config';

export const redisProvider = {
  provide: 'redis',
  useFactory: (configService: ConfigService) => {
    return new IoRedis({
      port: configService.get('redis.port'),
      host: configService.get('redis.host'),
      password: configService.get('redis.password'),
      db: configService.get('redis.db'),
    });
  },
  inject: [ConfigService],
};

export { Redis } from 'ioredis';
