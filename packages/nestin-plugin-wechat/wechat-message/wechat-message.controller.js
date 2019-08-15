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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wechat_message_service_1 = require("./wechat-message.service");
let WechatMessageController = class WechatMessageController {
    constructor(service) {
        this.service = service;
        this.log = common_1.Logger;
    }
    verifyNotification(query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('wechat-Data', JSON.stringify(query));
            return yield this.service.verifyNotification(query);
        });
    }
    sendMessage(query, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.Content === '1' || body.Content === 1) {
                const res = yield this.service.sendMessage(query);
                return res;
            }
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ title: '消息推送验证接口' }),
    common_1.Get('verify/open'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WechatMessageController.prototype, "verifyNotification", null);
__decorate([
    swagger_1.ApiOperation({ title: '消息推送发送接口' }),
    common_1.Post('verify/open'),
    __param(0, common_1.Query()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WechatMessageController.prototype, "sendMessage", null);
WechatMessageController = __decorate([
    swagger_1.ApiUseTags('微信客服'),
    common_1.Controller('wechat-message'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [wechat_message_service_1.WechatMessageService])
], WechatMessageController);
exports.WechatMessageController = WechatMessageController;
//# sourceMappingURL=wechat-message.controller.js.map