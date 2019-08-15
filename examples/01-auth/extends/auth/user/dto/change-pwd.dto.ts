import { IsNotEmpty } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePwdDto {
  @IsNotEmpty()
  @ApiModelProperty({ description: '原密码' })
  oldPassword: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: '新密码' })
  newPassword: string;
}
