import { Request } from 'express';
import { Strategy } from 'passport-strategy';

/**
 * 平台匿名策略。用户不需要通过验证，直接登陆
 */
export class PlatformStrategy extends Strategy {
  public name: string;
  constructor(readonly verify: any) {
    super();
    this.name = 'platform';
  }

  authenticate(request: Request, options: any) {
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
    const userToken = request.body.userToken;
    const userPhone = request.body.userPhone;
    if (!userToken && !userPhone) {
      this.verify(new Error(), verified);
    }
    this.verify({ userToken, userPhone }, verified);
  }
}
