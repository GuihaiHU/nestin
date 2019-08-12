import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { CommonEntity } from 'nestin-common/common.entity';
import { AuthUser } from '../../auth/user/user.entity';

@Entity('auth_role')
export class AuthRole extends CommonEntity<AuthRole> {
  @Column({ unique: true })
  name: string;

  @ManyToMany(type => AuthUser, user => user.roles)
  users: AuthUser[];
}
