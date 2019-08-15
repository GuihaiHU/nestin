"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const nestjs_config_1 = require("nestjs-config");
const path = require("path");
const common_1 = require("@nestjs/common");
const wechatpay_1 = require("@sigodenjs/wechatpay");
const app_exception_1 = require("nestin-common/exception/app.exception");
let WechatTransferService = class WechatTransferService {
    constructor(configService) {
        this.configService = configService;
        this.pay = new wechatpay_1.Bank({
            appId: this.configService.get('wechat.mini.appId'),
            key: this.configService.get('wechat-pay.key'),
            mchId: this.configService.get('wechat-pay.mchId'),
            pfx: fs.readFileSync(path.resolve(process.cwd(), this.configService.get('wechat-pay.pfxPath'))),
        });
    }
    transfers(tradeNo, openId, amount, desc = '提现') {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pay
                .transfers({
                partner_trade_no: tradeNo,
                openid: openId,
                check_name: 'NO_CHECK',
                amount,
                desc,
                spbill_create_ip: '119.137.52.53',
            })
                .then(res => {
                return res;
            })
                .catch(err => {
                this.handlerReject(err);
            });
            return yield this.handlerTransferResponse(result);
        });
    }
    getTransferInfo(tradeNo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pay.setDebug(this.configService.get('wechat-pay.debug'));
            const result = yield this.pay
                .getTransferInfo({
                partner_trade_no: tradeNo,
            })
                .then(res => {
                return res;
            })
                .catch(err => {
                return this.handlerReject(err);
            });
            if (result.result_code === 'SUCCESS') {
                return result;
            }
            if (result.err_code === 'NOT_FOUND') {
                return 'pending';
            }
            throw new app_exception_1.AppException({
                msg: '企业付款-零钱 订单信息查询失败',
                err_code: result.err_code,
                err_code_des: result.err_code_des,
            });
        });
    }
    handlerReject(err) {
        if (err instanceof wechatpay_1.RequestError) {
            throw new app_exception_1.AppException('远程调用微信api失败');
        }
        else if (err instanceof wechatpay_1.CommunicationError) {
            throw new app_exception_1.AppException('return_code = FAIL，微信api故障');
        }
        throw new app_exception_1.AppException('未知错误');
    }
    handlerTransferResponse(res) {
        if (res.result_code === 'SUCCESS') {
            return 'success';
        }
        if (res.result_code === 'FAIL' && res.err_code !== 'SYSTEMERROR') {
            throw new app_exception_1.AppException({
                msg: '付款失败',
                err_code: res.err_code,
                err_code_des: res.err_code_des,
            });
        }
        return 'pending';
    }
};
WechatTransferService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_config_1.ConfigService])
], WechatTransferService);
exports.WechatTransferService = WechatTransferService;
//# sourceMappingURL=wechat-transfer.service.js.map