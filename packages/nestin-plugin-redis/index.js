"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IoRedis = require("ioredis");
const nestjs_config_1 = require("nestjs-config");
exports.redisProvider = {
    provide: 'redis',
    useFactory: (configService) => {
        return new IoRedis({
            port: configService.get('redis.port'),
            host: configService.get('redis.host'),
            password: configService.get('redis.password'),
            db: configService.get('redis.db'),
        });
    },
    inject: [nestjs_config_1.ConfigService],
};
var ioredis_1 = require("ioredis");
exports.Redis = ioredis_1.Redis;
//# sourceMappingURL=index.js.map