export declare class WXBizDataCrypt {
    protected readonly appId: string;
    protected readonly sessionKey: string;
    constructor(appId: string, sessionKey: string);
    decryptDate(encryptedStr: string, ivStr: string): any;
}
