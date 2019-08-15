import { Body, Controller, Patch, Post, Get, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/auth.decorator';
import { WxUserDto } from './dto/wx-user.dto';
import { AuthUser } from './user.entity';
import { AuthUserService } from './user.service';
import { WxEncryptedDto } from './dto/wx-encrypted.dto';

@ApiUseTags('个人账户管理')
@ApiBearerAuth()
@Controller('user')
export class AuthUserController {
  constructor(public service: AuthUserService) {}

  @Put('phone')
  @ApiOperation({ title: '绑定手机号' })
  async bindPhone(@CurrentUser() user: AuthUser, @Body() info: WxEncryptedDto) {
    return this.service.bindPhone(user, info.encryptedData, info.iv);
  }

  @Put('user-info')
  @ApiOperation({ title: '保存用户信息' })
  async updateUserInfo(@CurrentUser() user: AuthUser, @Body() info: WxUserDto) {
    return this.service.updateUserInfo(user, info);
  }
}
