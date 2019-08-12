import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthRole } from './role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  private reflector: Reflector;
  constructor() {
    this.reflector = new Reflector();
  }

  canActivate(context: ExecutionContext): boolean {
    let roles = this.reflector.get<string[]>('roles', context.getHandler());
    const classRoles = this.reflector.get<string[]>('roles', context.getClass());
    if (!roles) {
      if (!classRoles) {
        return true;
      } else {
        roles = classRoles;
      }
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role: AuthRole) => roles.includes(role.name) || role.name === 'admin');
    return user && user.roles && hasRole();
  }
}
