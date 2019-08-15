"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const wechat_transfer_controller_1 = require("./wechat-transfer.controller");
const wechat_transfer_service_1 = require("./wechat-transfer.service");
const wechat_transfer_console_1 = require("./wechat-transfer.console");
const wechat_transfer_info_schedule_1 = require("./wechat-transfer-info.schedule");
let WechatTransferModule = class WechatTransferModule {
};
WechatTransferModule = __decorate([
    common_1.Module({
        imports: [],
        providers: [wechat_transfer_service_1.WechatTransferService, wechat_transfer_console_1.WechatTransferConsole, wechat_transfer_info_schedule_1.WechatTransferInfoSchedule],
        controllers: [wechat_transfer_controller_1.WechatTransferController],
        exports: [wechat_transfer_service_1.WechatTransferService],
    })
], WechatTransferModule);
exports.WechatTransferModule = WechatTransferModule;
//# sourceMappingURL=wechat-transfer.module.js.map