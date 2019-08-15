import { AuthUser } from '../user/user.entity';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { CurrentUser } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { WechatMiniDto } from './dto/wechat.mini.dto';

@ApiUseTags('认证')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthLocalController {
  protected logger = new Logger();
  constructor(
    private readonly authService: AuthService, // private readonly ssoService: AuthSsoService
  ) {}

  async genLoginToken(user: AuthUser) {
    const tokenInfo = await this.authService.genToken(user.id);
    return Object.assign({}, tokenInfo, {
      nickName: user.nickName,
      username: user.username,
      avatar: user.avatarPath,
      role: user.roles.map(role => role.name),
    });
  }

  @HttpCode(200)
  @Post('admin/login')
  @UseGuards(AuthGuard('admin-local'))
  @ApiOperation({ title: '管理员登录' })
  async adminLogin(@CurrentUser() user: AuthUser, @Body() loginDto: LoginDto) {
    this.logger.log('test log:', 'test1');
    this.logger.error('test error:', '', 'test2');
    return this.genLoginToken(user);
  }

  @HttpCode(200)
  @Post('login/wechat-mini')
  @UseGuards(AuthGuard('wechat-mini'))
  @ApiOperation({ title: '普通用户微信小程序自动注册登录' })
  async loginWechatMini(@CurrentUser() user: AuthUser, @Body() userDto: WechatMiniDto) {
    const result = await this.genLoginToken(user);
    result['phone'] = user.phone;
    return result;
  }

  /**
   * 微信app注册登录
   * @param params
   * @param userDto
   */
  // @HttpCode(200)
  // @Post('login/wechat-app')
  // async signApp (@Param() params, @Body() userDto) {
  //   const data = await this.ssoService.update(params.userId, userDto)
  //   return data
  // }

  // /**
  //  * 微信js注册登录
  //  * @param params
  //  * @param userDto
  //  */
  // @HttpCode(200)
  // @Post('login/wechat-jsapi')
  // async signJs (@Param() params, @Body() userDto) {
  //   const data = await this.ssoService.update(params.userId, userDto)
  //   return data
  // }
}
