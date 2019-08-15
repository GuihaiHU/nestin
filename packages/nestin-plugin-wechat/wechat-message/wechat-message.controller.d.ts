import { WechatMessageService } from './wechat-message.service';
export declare class WechatMessageController {
    service: WechatMessageService;
    protected log: any;
    constructor(service: WechatMessageService);
    verifyNotification(query: any): Promise<any>;
    sendMessage(query: any, body: any): Promise<boolean>;
}
