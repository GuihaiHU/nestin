import { Strategy } from 'passport-http-bearer';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

/**
 * 验证Bear Token的策略，没开发完成，目前由中间件完成这个任务
 */
@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor() {
    super();
  }

  async validate(token: any, done: (err: Error, status: boolean) => void) {
    const user = '';
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
