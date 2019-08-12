import { NextFunction, Request, Response } from 'express';

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthBearMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    let token = req.query.token || req.body.token;
    // token获取顺序：1.query  2.body 3.header 4.cookie
    if (!token) {
      if (authHeader) {
        const bearerIndex = authHeader.indexOf('Bearer');
        token = authHeader.substring(bearerIndex + 7);
      } else {
        const cookies = req.headers.cookie;
        const cookieArray = {};
        if (cookies) {
          cookies.split(';').map(item => {
            const kv = item.split('=');
            cookieArray[kv[0]] = kv[1];
          });
        }
        token = cookieArray['token'];
      }
    }
    req.user = await this.authService.getUserByToken(token);
    await this.authService.updateTokenTTL(token);
    // 认证接口和开放接口不需要认证
    if (['/auth/'].find(path => req.path.startsWith(path)) || ['open/', 'open'].find(path => req.path.endsWith(path))) {
      next();
    } else {
      if (!req.user) {
        throw new UnauthorizedException('登录失效，请重新登录');
      } else {
        next();
      }
    }
  }
}
