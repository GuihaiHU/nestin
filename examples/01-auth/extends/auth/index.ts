import { AuthModule } from './auth/auth.module';
import { AuthRoleModule } from './role/role.module';
import { AuthUserModule } from './user/user.module';
import { AuthSsoModule } from './sso/sso.module';
export * from './auth/auth.module';

export default [AuthRoleModule, AuthUserModule, AuthSsoModule, AuthModule];
