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
const nestjs_console_1 = require("nestjs-console");
const wechat_transfer_service_1 = require("./wechat-transfer.service");
const common_1 = require("@nestjs/common");
let WechatTransferConsole = class WechatTransferConsole {
    constructor(consoleService, wechatTransfersService) {
        this.consoleService = consoleService;
        this.wechatTransfersService = wechatTransfersService;
        this.logger = new common_1.Logger();
        const cli = this.consoleService.getCli();
        cli
            .command('wechat-transfers:send')
            .description('企业付款-零钱 发给测试号零钱')
            .action(this.transfers.bind(this));
        cli
            .command('wechat-transfers:info')
            .description('企业付款-零钱 查询订单')
            .action(this.getTransferInfo.bind(this));
    }
    transfers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('开始给测试号发1分钱');
                yield this.wechatTransfersService.transfers('10000', 'op9ls0YUuMJQPZvmw_tpBMSZv1Do', 1);
            }
            catch (err) {
                this.logger.error(err);
            }
            process.exit(0);
        });
    }
    getTransferInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.wechatTransfersService.getTransferInfo('10000');
                this.logger.log(result);
            }
            catch (err) {
                this.logger.error(err);
            }
            process.exit(0);
        });
    }
};
WechatTransferConsole = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_console_1.ConsoleService,
        wechat_transfer_service_1.WechatTransferService])
], WechatTransferConsole);
exports.WechatTransferConsole = WechatTransferConsole;
//# sourceMappingURL=wechat-transfer.console.js.map