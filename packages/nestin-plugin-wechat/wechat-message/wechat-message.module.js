"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const wechat_message_controller_1 = require("./wechat-message.controller");
const wechat_message_service_1 = require("./wechat-message.service");
const nestin_plugin_redis_1 = require("nestin-plugin-redis");
let WechatMessageModule = class WechatMessageModule {
};
WechatMessageModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        controllers: [wechat_message_controller_1.WechatMessageController],
        providers: [wechat_message_service_1.WechatMessageService, nestin_plugin_redis_1.redisProvider],
    })
], WechatMessageModule);
exports.WechatMessageModule = WechatMessageModule;
//# sourceMappingURL=wechat-message.module.js.map