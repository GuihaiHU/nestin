import { ConsoleService } from 'nestjs-console';
import { WechatTransferService } from './wechat-transfer.service';
export declare class WechatTransferConsole {
    private readonly consoleService;
    private readonly wechatTransfersService;
    private readonly logger;
    constructor(consoleService: ConsoleService, wechatTransfersService: WechatTransferService);
    transfers(): Promise<void>;
    getTransferInfo(): Promise<void>;
}
