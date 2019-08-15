import { IsNotEmpty, IsString } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class WechatMiniDto {
  @ApiModelProperty({ description: '状态码' })
  @IsNotEmpty()
  @IsString()
  code: string;
}
