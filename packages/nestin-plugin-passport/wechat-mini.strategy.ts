import { Request } from 'express';
import { Strategy as S } from 'passport-strategy';
import * as OAuth from 'wechat-oauth';

export class WechatMiniStrategy extends S {
  public name: string;
  private oauth: OAuth;
  constructor(public options: any, readonly verify: any) {
    super();
    this.name = 'wechat-mini';
    this.oauth = new OAuth(options.appId, options.appSecret, options.getToken, options.saveToken, true);
  }

  authenticate(request: Request, options: any) {
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
    this.oauth.getSessionKey(code, (err: Error, sessionInfo) => {
      if (err) {
        // throw err
        this.verify(err, verified);
      }
      this.verify(sessionInfo, verified);
    });
  }
}
