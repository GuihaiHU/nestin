import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class WechatMessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({ description: 'signature' })
  signature: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelPropertyOptional({ description: 'timestamp' })
  timestamp: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelPropertyOptional({ description: 'nonce' })
  nonce: string;

  @IsOptional()
  @ApiModelPropertyOptional({ description: 'echostr' })
  echostr: string;
}
