import { Injectable, HttpService, Inject } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as crypto from 'crypto';
import { Redis } from '@plugin/redis';

@Injectable()
export class WechatMessageService {
  @Inject('redis')
  redisClient: Redis;
  ttl: number;
  protected appId: string;
  protected appSecret: string;
  constructor(readonly config: ConfigService, readonly httpService: HttpService) {
    this.appId = config.get('wechat.mini.appId');
    this.appSecret = config.get('wechat.mini.appSecret');
    this.ttl = 60 * 60 * 2;
  }

  async verifyNotification(query) {
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
    } else {
      return false;
    }
  }

  async sendMessage(query) {
    const hasAccessToken = await this.redisClient.get('access_token');
    let accessToken;
    if (!hasAccessToken) {
      accessToken = await this.getAccessToken();
    } else {
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
    const res = await this.httpService.post(url, data).toPromise();
    if (res) {
      return true;
    }
  }

  async getAccessToken() {
    const url =
      'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
      this.appId +
      '&secret=' +
      this.appSecret +
      '&';
    const cc = await this.httpService.get(url).toPromise();
    await this.redisClient.set('access_token', cc.data.access_token, 'EX', this.ttl);
    return cc.data.access_token;
  }
}
