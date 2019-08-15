import { IsNotEmpty, IsString } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty({ description: '用户名', example: 'admin' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiModelProperty({ description: '密码', example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
