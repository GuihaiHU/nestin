import { ConfigService } from 'nestjs-config';
export declare class WechatTransferService {
    private readonly configService;
    private pay;
    constructor(configService: ConfigService);
    transfers(tradeNo: string, openId: string, amount: number, desc?: string): Promise<"pending" | "success">;
    getTransferInfo(tradeNo: string): Promise<any>;
    handlerReject(err: any): void;
    handlerTransferResponse(res: any): "pending" | "success";
}
