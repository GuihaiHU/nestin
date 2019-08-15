import { ConfigService } from 'nestjs-config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthUserService } from '../user/user.service';
import { AuthSso } from './sso.entity';
import { CommonService } from 'nestin-common/service/common.service';

@Injectable()
export class AuthSsoService extends CommonService<AuthSso> {
  constructor(
    @InjectRepository(AuthSso) public repo: Repository<AuthSso>,
    readonly userService: AuthUserService,
    readonly configService: ConfigService,
  ) {
    super(repo);
  }

  /**
   * 更新token
   * @param data
   * @param type : wechat, weibo
   */
  updateOrCreateWxMiniUser(type: string) {
    return async (openId: string, data: any, callback: () => void) => {
      const sso = await this.repo.findOne({ openId, type });
      if (!sso) {
        const [user, created] = await this.userService.findOrCreate({ roleNames: ['customer'] });
        await this.repo.save({
          type,
          userId: user.id,
          openId,
          unionId: data.unionid,
          visitToken: data['session_key'],
        });
      } else {
        sso.visitToken = data['session_key'];
        await this.repo.save(sso);
      }
      callback();
    };
  }

  getToken(type: string) {
    return async (openId: string, callback: (err: Error, token: any) => void) => {
      const sso = await this.repo.findOne({ openId, type });
      const result = { session_key: sso.visitToken, openid: sso.openId };
      callback(null, result);
      return result;
    };
  }

  async getUser(token) {
    const sso = await this.repo.findOne({ openId: token.openid }, { relations: ['user', 'user.roles'] });
    return sso.user;
  }
}
