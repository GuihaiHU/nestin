import { HttpService } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { Redis } from 'nestin-plugin-redis';
export declare class WechatMessageService {
    readonly config: ConfigService;
    readonly httpService: HttpService;
    redisClient: Redis;
    ttl: number;
    protected appId: string;
    protected appSecret: string;
    constructor(config: ConfigService, httpService: HttpService);
    verifyNotification(query: any): Promise<any>;
    sendMessage(query: any): Promise<boolean>;
    getAccessToken(): Promise<any>;
}
