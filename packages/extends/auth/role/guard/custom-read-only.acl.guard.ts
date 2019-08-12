import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CrudActions, getAction } from '@nestjsx/crud';
import { AuthRole } from '@app/auth/role/role.entity';

@Injectable()
export class CustomReadOnlyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const handler = ctx.getHandler();
    const action = getAction(handler);

    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const isAdmin = user.roles.some((role: AuthRole) => role.name === 'admin');

    if (action === CrudActions.ReadAll || action === CrudActions.ReadOne) {
      return true;
    } else if (isAdmin) {
      return true;
    } else {
      return false;
    }
  }
}
