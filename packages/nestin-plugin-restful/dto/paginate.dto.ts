import { IsOptional } from 'class-validator';

import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class PaginateDto {
  @IsOptional()
  @ApiModelPropertyOptional({ description: '页码' })
  page: number;

  @IsOptional()
  @ApiModelPropertyOptional({ description: '显示个数' })
  limit: number;
}
