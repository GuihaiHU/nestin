import { AuthSso } from '../sso/sso.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToOne, OneToMany } from 'typeorm';

import { AuthRole } from '../role/role.entity';
import { CommonEntity } from 'nestin-common/common.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

@Entity('auth_user')
export class AuthUser extends CommonEntity<AuthUser> {
  @IsString()
  @ApiModelProperty({ description: '用户名' })
  @Column({ unique: true, nullable: true })
  username?: string;

  @IsString()
  @ApiModelPropertyOptional({ description: '密码' })
  @Column({ nullable: true })
  password?: string;

  @IsString()
  @ApiModelPropertyOptional({ description: '头像path' })
  @Column({ comment: '头像路径', name: 'avatar_path', nullable: true })
  avatarPath?: string;

  @IsString()
  @ApiModelPropertyOptional({ description: '微信用户昵称' })
  @Column({ comment: '微信用户昵称', name: 'nick_name', nullable: true })
  nickName?: string;

  @IsString()
  @ApiModelPropertyOptional({ description: '手机号' })
  @Column({ comment: '手机号', nullable: true })
  phone?: string;

  @ApiModelPropertyOptional({ description: '角色' })
  @ManyToMany(type => AuthRole)
  @JoinTable({ joinColumns: [{ name: 'user_id' }], inverseJoinColumns: [{ name: 'role_id' }] })
  roles?: AuthRole[];

  @IsBoolean()
  @ApiModelPropertyOptional({ description: '是否可用' })
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive?: boolean;

  @OneToOne(type => AuthSso, sso => sso.user)
  wxaSso: AuthSso;

  wxaOpenId?: string;
}
