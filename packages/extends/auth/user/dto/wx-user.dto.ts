import { IsOptional, IsString, IsBoolean } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class WxUserDto {
  // @IsOptional()
  // @IsString()
  // @ApiModelProperty({ description: '用户名' })
  // username?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({ description: '昵称' })
  nickName?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({ description: '头像' })
  avatarPath?: string;

  // @IsOptional()
  // @IsString()
  // @ApiModelProperty({ description: '手机号' })
  // phone?: string;
}
