import { IsNotEmpty, IsOptional } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class MiniUserInfoDto {
  @IsNotEmpty()
  @ApiModelProperty({ description: '用户昵称' })
  nickName: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: '头像url' })
  avatarUrl: string;
}
