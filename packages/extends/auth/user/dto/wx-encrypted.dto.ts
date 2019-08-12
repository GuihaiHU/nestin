import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class WxEncryptedDto {
  @IsString()
  @ApiModelProperty({ description: '加密数据' })
  encryptedData: string;

  @IsString()
  @ApiModelProperty({ description: '初始向量' })
  iv: string;
}
