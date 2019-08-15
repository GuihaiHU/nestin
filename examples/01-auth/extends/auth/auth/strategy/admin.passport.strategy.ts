import { Strategy } from 'passport-local';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthUserService } from '../../user/user.service';

/**
 * 管理员用户名，密码登录
 */
@Injectable()
export class AdminPassportStrategy extends PassportStrategy(Strategy, 'admin-local') {
  constructor(private readonly userService: AuthUserService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(name: string, password: string, done: (err: Error, status: boolean) => void) {
    let user = null;
    try {
      user = await this.userService.verifyAdminLogin(name, password);
    } catch (error) {
      return done(error, false);
    }
    if (!user) {
      return done(new UnauthorizedException('用户名或者密码错误，请重新输入'), false);
    }
    done(null, user);
  }
}
