import { ConfigService } from 'nestjs-config';

import { AuthSsoService } from '../../sso/sso.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { WechatMiniStrategy } from 'nestin-plugin-passport/wechat-mini.strategy';

/**
 * 微信小程序认证策略
 */
@Injectable()
export class WechatMiniPassportStrategy extends PassportStrategy(WechatMiniStrategy) {
  protected logger = new Logger();

  constructor(configService: ConfigService, readonly ssoService: AuthSsoService) {
    super({
      appId: configService.get('wechat.mini.appId'),
      appSecret: configService.get('wechat.mini.appSecret'),
      saveToken: ssoService.updateOrCreateWxMiniUser('wechat.mini'),
      getToken: ssoService.getToken('wechat.mini'),
    });
  }

  async validate(sessionInfo: any, done: (err: Error, data: any) => void) {
    if (sessionInfo instanceof Error) {
      if ((sessionInfo as any).code === 40163) {
        return done(new UnauthorizedException('状态码已被使用，登录失败'), false);
      }
      return done(new UnauthorizedException('微信登录失败' + sessionInfo.message), false);
    }
    const user = await this.ssoService.getUser(sessionInfo.data);
    if (!user) {
      return done(new UnauthorizedException('微信登录失败, 未知错误'), false);
    }
    done(null, user);
  }
}
