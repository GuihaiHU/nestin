import * as crypto from 'crypto';

export class WXBizDataCrypt {
  constructor(protected readonly appId: string, protected readonly sessionKey: string) {}

  decryptDate(encryptedStr: string, ivStr: string) {
    // base64 decode
    const sessionKey = Buffer.from(this.sessionKey, 'base64');
    const encryptedData = Buffer.from(encryptedStr, 'base64');
    const iv = Buffer.from(ivStr, 'base64');

    let decoded: any;
    // 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
    // 设置自动 padding 为 true，删除填充补位
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
