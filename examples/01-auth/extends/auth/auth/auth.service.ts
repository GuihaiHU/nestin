import * as uuid from 'uuid';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Redis } from 'nestin-plugin-redis';

import { AuthUserService } from '../user/user.service';

@Injectable()
export class AuthService {
  @Inject('redis')
  redisClient: Redis;
  ttl: number;
  protected logger = new Logger();
  public constructor(public readonly userService: AuthUserService) {
    this.ttl = 60 * 60 * 24 * 10; // 10天
    // console.log('redis:', this.redisClient)
    this.logger.log('hello!');
  }

  /**
   * genToken
   */
  public async genToken(userId: number) {
    const token = uuid().replace(/-/g, '');
    const now = new Date().getTime();
    const expired = now + this.ttl * 1000;
    await this.redisClient.set(token, JSON.stringify({ userId }), 'EX', this.ttl);
    return {
      token,
      expired,
    };
  }

  public async getUserByToken(token: string) {
    if (!token) {
      return null;
    }
    const info = await this.redisClient.get(token);
    if (!info) {
      return null;
    }
    const { userId } = JSON.parse(info);
    return this.userService.findOne({ id: userId }, { relations: ['roles', 'wxaSso'] });
  }

  public async updateTokenTTL(token: string) {
    if (!token) {
      return null;
    }
    const info = await this.redisClient.expire(token, this.ttl);
  }
}
