"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class WXBizDataCrypt {
    constructor(appId, sessionKey) {
        this.appId = appId;
        this.sessionKey = sessionKey;
    }
    decryptDate(encryptedStr, ivStr) {
        const sessionKey = Buffer.from(this.sessionKey, 'base64');
        const encryptedData = Buffer.from(encryptedStr, 'base64');
        const iv = Buffer.from(ivStr, 'base64');
        let decoded;
        const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
        decipher.setAutoPadding(true);
        decoded = decipher.update(encryptedData, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        decoded = JSON.parse(decoded);
        if (decoded.watermark.appid !== this.appId) {
            throw new Error('APPID不匹配');
        }
        return decoded;
    }
}
exports.WXBizDataCrypt = WXBizDataCrypt;
//# sourceMappingURL=wechat-biz-data-crypt.js.map