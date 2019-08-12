import { Entity, Column } from 'typeorm';
import { CommonEntity } from 'nestin-common/common.entity';

@Entity('sys_config')
export class SysConfig extends CommonEntity<SysConfig> {
  @Column({ comment: 'key' })
  key: string;

  @Column({ comment: 'key', type: 'json' })
  value: object;
}
