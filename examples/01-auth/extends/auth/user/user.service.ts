import { PaginatorAdapter } from 'nestin-common/help/paginator.adapter';
import { WXBizDataCrypt } from 'nestin-plugin-wechat/wechat-biz-data-crypt';
import { compare, genSalt, hash } from 'bcrypt';
import { In, Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

import { AuthRole } from '../role/role.entity';
import { AppException } from 'nestin-common/exception/app.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestService } from 'nestin-plugin-restful';

import { ChangePwdDto } from './dto/change-pwd.dto';
import { AuthUser } from './user.entity';
import { RestQueryDto } from 'nestin-plugin-restful/dto/query.dto';
import { WxUserDto } from './dto/wx-user.dto';

@Injectable()
export class AuthUserService extends RestService<AuthUser> {
  constructor(
    @InjectRepository(AuthUser) public readonly repo: Repository<AuthUser>,
    @InjectRepository(AuthRole) readonly roleRepository: Repository<AuthRole>,
  ) {
    super(repo);
  }

  async _encrypt(plainTextPassword: string) {
    const SALT_ROUNDS = this.configService.get('password_salt_round') || 10;
    const salt = await genSalt(SALT_ROUNDS);
    const hashPassword = await hash(plainTextPassword, salt);
    return hashPassword;
  }

  async changePwd(user: AuthUser, dto: ChangePwdDto) {
    if (await compare(dto.oldPassword, user.password)) {
      user.password = await this._encrypt(dto.newPassword);
      return this.repo.save(user);
    } else {
      throw new AppException('原密码错误，请重新输入', { code: 1 });
    }
  }

  async resetPwd(user: AuthUser) {
    const pwd: string = this.configService.get('reset_password') || '123456';
    user.password = await this._encrypt(pwd);
    return this.repo.save(user);
  }

  async verifyLogin(username: string, plainTextPassword: string): Promise<AuthUser> {
    const user = await this.repo.findOne({ username }, { relations: ['roles'] });
    if (!user) {
      throw new AppException('用户不存在', { httpCode: 401, code: 2 });
    }
    const result = await compare(plainTextPassword, user.password);
    if (result) {
      return user;
    } else {
      throw new AppException('用户名密码不匹配', { httpCode: 401, code: 1 });
    }
  }

  /**
   * 超级管理员admin, 普通管理员manager登陆验证
   * @param username
   * @param plainTextPassword
   */
  async verifyAdminLogin(username: string, plainTextPassword: string): Promise<AuthUser> {
    const user = await this.repo.findOne({ username }, { relations: ['roles'] });
    if (!user) {
      throw new AppException('用户不存在', { httpCode: 401, code: 2 });
    }
    if (!user.isActive) {
      throw new AppException('您已被禁止登录，请联系管理员', { httpCode: 403, code: 1 });
    }
    if (!user.roles.some(role => role.name === 'admin' || role.name === 'manager')) {
      throw new AppException('您没有管理员权限，无法登陆', { httpCode: 403, code: 2 });
    }
    const result = await compare(plainTextPassword, user.password);
    if (result) {
      return user;
    } else {
      throw new AppException('用户名密码不匹配', { httpCode: 401, code: 1 });
    }
  }

  async findOrCreate(entity: DeepPartial<AuthUser> & { roleNames: string[] }): Promise<[AuthUser, boolean]> {
    if (entity.username) {
      const user = await this.repo.findOne({ username: entity.username });
      if (user) {
        return [user, false];
      }
    }
    entity.isActive = entity.isActive === undefined || entity.isActive;
    if (entity.password) {
      entity.password = await this._encrypt(entity.password);
    }
    entity.roles = await this.roleRepository.find({
      name: In(entity.roleNames),
    });
    // user = await this.repo.save(entity);
    return [await this.repo.save(entity), true];
  }

  async updateEntity(entity: number | AuthUser, info: DeepPartial<AuthUser>): Promise<AuthUser> {
    let e: AuthUser;
    if (isFinite(entity as any)) {
      e = await this.repo.findOneOrFail(entity as number);
    } else {
      e = entity as AuthUser;
    }
    Object.assign(e, info);
    if (info.password === '') {
      throw new AppException('密码不能为空', { httpCode: 400 });
    }
    if (info.password) {
      e.password = await this._encrypt(info.password);
    }
    return this.repo.save(e);
  }

  async bindPhone(user: AuthUser, encryptedData: string, iv: string) {
    if (user.phone) {
      throw new AppException('用户手机号已绑定');
    }
    const crypt = new WXBizDataCrypt(this.configService.get('wechat.mini.appId'), user.wxaSso.visitToken);
    const info = crypt.decryptDate(encryptedData, iv);
    user.phone = info['phoneNumber'];
    return this.repo.save(user);
  }

  async updateUserInfo(user: AuthUser, info: WxUserDto) {
    if (user.nickName) {
      throw new AppException('用户信息已存在');
    }
    user.nickName = info.nickName;
    return this.repo.save(user);
  }

  // 管理员列表
  async getManagerUsers(query: RestQueryDto) {
    const [users, total] = await this.repo
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.username')
      .addSelect('user.isActive')
      .leftJoin('user.roles', 'role')
      .where('role.name IN (:...names)', { names: ['admin', 'manager'] })
      .orderBy('user.id', 'DESC')
      .take(query.limit)
      .offset(query.offset)
      .getManyAndCount();
    return new PaginatorAdapter(users, total, query.page, query.limit);
  }
}
