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
const common_1 = require("@nestjs/common");
const nestjs_config_1 = require("nestjs-config");
const crypto = require("crypto");
let WechatMessageService = class WechatMessageService {
    constructor(config, httpService) {
        this.config = config;
        this.httpService = httpService;
        this.appId = config.get('wechat.mini.appId');
        this.appSecret = config.get('wechat.mini.appSecret');
        this.ttl = 60 * 60 * 2;
    }
    verifyNotification(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const signature = query.signature;
            const timestamp = query.timestamp;
            const nonce = query.nonce;
            const token = this.config.get('wechat.mini.notificationToken');
            const tmpStr = crypto
                .createHash('sha1')
                .update([token, timestamp, nonce].sort().join(''))
                .digest('hex');
            if (tmpStr === signature) {
                return query.echostr;
            }
            else {
                return false;
            }
        });
    }
    sendMessage(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasAccessToken = yield this.redisClient.get('access_token');
            let accessToken;
            if (!hasAccessToken) {
                accessToken = yield this.getAccessToken();
            }
            else {
                accessToken = hasAccessToken;
            }
            const data = {
                touser: query.openid,
                msgtype: 'link',
                link: {
                    title: this.config.get('wechat.mini.message.title'),
                    description: this.config.get('wechat.mini.message.description'),
                    url: this.config.get('wechat.mini.message.url'),
                    thumb_url: this.config.get('wechat.mini.message.thumbUrl'),
                },
            };
            const url = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + accessToken + '&';
            const res = yield this.httpService.post(url, data).toPromise();
            if (res) {
                return true;
            }
        });
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
                this.appId +
                '&secret=' +
                this.appSecret +
                '&';
            const cc = yield this.httpService.get(url).toPromise();
            yield this.redisClient.set('access_token', cc.data.access_token, 'EX', this.ttl);
            return cc.data.access_token;
        });
    }
};
__decorate([
    common_1.Inject('redis'),
    __metadata("design:type", Object)
], WechatMessageService.prototype, "redisClient", void 0);
WechatMessageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_config_1.ConfigService, common_1.HttpService])
], WechatMessageService);
exports.WechatMessageService = WechatMessageService;
//# sourceMappingURL=wechat-message.service.js.map