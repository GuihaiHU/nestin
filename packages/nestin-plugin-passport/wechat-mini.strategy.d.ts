import { Request } from 'express';
import { Strategy as S } from 'passport-strategy';
export declare class WechatMiniStrategy extends S {
    options: any;
    readonly verify: any;
    name: string;
    private oauth;
    constructor(options: any, verify: any);
    authenticate(request: Request, options: any): void;
}
