import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { AuthUser } from '../user/user.entity';
import { CommonEntity } from 'nestin-common/common.entity';

@Entity('auth_sso')
export class AuthSso extends CommonEntity<AuthSso> {
  @Column({ name: 'user_id', type: 'int', comment: '对应auth_uses 的id' })
  userId: number;

  @OneToOne(type => AuthUser)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  @Column({ comment: '单点登录对应的类型' })
  type: string;

  @Index()
  @Column({ name: 'open_id', unique: true })
  openId: string;

  @Index()
  @Column({
    name: 'union_id',
    comment: '同比于微信的 unionId',
    nullable: true,
  })
  unionId: string;

  @Column({ name: 'visit_token', comment: '对应小程序的session_key,公众号的access_token', nullable: true })
  visitToken: string;

  @Column({ name: 'refresh_token', comment: '小程序没有refreshToken', nullable: true })
  refreshToken: string;

  @Column({ name: 'expires_in', nullable: true })
  expiresIn: string;

  @Column({ name: 'scope', nullable: true })
  scope: string;

  @Column({ name: 'visit_token_created_at', nullable: true })
  visitTokenCreatedAt: Date;
}
