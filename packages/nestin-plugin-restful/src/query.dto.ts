import { IsOptional } from 'class-validator';

import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class QueryDto {
  @IsOptional()
  @ApiModelPropertyOptional({ description: '要显示的字段' })
  fields?: string;

  @IsOptional()
  @ApiModelPropertyOptional({ description: '过滤条件' })
  filters?: string;

  @IsOptional()
  @ApiModelPropertyOptional({ description: '“或”过滤条件' })
  or?: string;

  @IsOptional()
  @ApiModelPropertyOptional({ description: '关联字段' })
  join?: string;

  @IsOptional()
  @ApiModelPropertyOptional({ description: '排序' })
  sort?: string;

  @IsOptional()
  @ApiModelPropertyOptional({ description: '显示个数' })
  limit?: number;

  @IsOptional()
  @ApiModelPropertyOptional({ description: '跳过个数' })
  offset?: number;

  @IsOptional()
  @ApiModelPropertyOptional({ description: '显示页码' })
  page?: number;

  @IsOptional()
  @ApiModelPropertyOptional({ description: '是否缓存', enum: [0, 1] })
  cache?: number;
}
