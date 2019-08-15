import { NestSchedule } from 'nest-schedule';
import { WechatTransferService } from './wechat-transfer.service';
export declare class WechatTransferInfoSchedule extends NestSchedule {
    private wechatTransferService;
    private logger;
    constructor(wechatTransferService: WechatTransferService);
}
