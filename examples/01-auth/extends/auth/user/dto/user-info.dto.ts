import { IsOptional, IsString, IsBoolean } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty({ description: '用户名' })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({ description: '头像' })
  avatarPath?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({ description: '手机号' })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({ description: '密码' })
  password?: string;

  @IsOptional()
  @IsBoolean()
  @ApiModelProperty({ description: '是否激活' })
  isActive?: boolean;
}
