import { Module } from '@nestjs/common';
import { AuthUserModule } from '../user/user.module';
import { AuthSsoModule } from '../sso/sso.module';
import { AuthLocalController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminPassportStrategy } from './strategy/admin.passport.strategy';
import { AuthBearMiddleware } from './auth.middleware';
import { redisProvider } from '@plugin/redis';
import { WechatMiniPassportStrategy } from './strategy/wechat-mini.passport.strategy';

@Module({
  imports: [AuthUserModule, AuthSsoModule, AuthSsoModule],
  controllers: [AuthLocalController],
  providers: [AuthService, WechatMiniPassportStrategy, AdminPassportStrategy, AuthBearMiddleware, redisProvider],
  exports: [AuthService, AuthBearMiddleware],
})
export class AuthModule {}
