"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_strategy_1 = require("passport-strategy");
const OAuth = require("wechat-oauth");
class WechatMiniStrategy extends passport_strategy_1.Strategy {
    constructor(options, verify) {
        super();
        this.options = options;
        this.verify = verify;
        this.name = 'wechat-mini';
        this.oauth = new OAuth(options.appId, options.appSecret, options.getToken, options.saveToken, true);
    }
    authenticate(request, options) {
        const code = request.body.code || request.query.code;
        const self = this;
        function verified(err, user, info) {
            if (err) {
                return self.error(err);
            }
            if (!user) {
                return self.fail(info);
            }
            self.success(user, info);
        }
        this.oauth.getSessionKey(code, (err, sessionInfo) => {
            if (err) {
                this.verify(err, verified);
            }
            this.verify(sessionInfo, verified);
        });
    }
}
exports.WechatMiniStrategy = WechatMiniStrategy;
//# sourceMappingURL=wechat-mini.strategy.js.map