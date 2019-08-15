import { Strategy } from 'passport-local';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthUserService } from '../../user/user.service';

/**
 * 普通用户用户名密码登录
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: AuthUserService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(name: string, password: string, done: (err: Error, status: boolean) => void) {
    let user = null;
    try {
      user = await this.userService.verifyLogin(name, password);
    } catch (error) {
      return done(error, false);
    }
    if (!user) {
      return done(new UnauthorizedException('用户名或者密码错误，请重新输入'), false);
    }
    done(null, user);
  }
}
