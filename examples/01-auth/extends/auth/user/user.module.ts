import { AuthRoleModule } from '../role/role.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './user.entity';
import { AuthUserService } from './user.service';
import { AuthUserManagerAdminController } from './manager.admin.controller';
import { AuthUserCustomerAdminController } from './customer.admin.controller';
import { AuthRole } from '../role/role.entity';
import { AuthUserController } from './user.controller';
import { UserConsole } from './user.console';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUser, AuthRole]), AuthRoleModule],
  controllers: [AuthUserManagerAdminController, AuthUserCustomerAdminController, AuthUserController],
  providers: [AuthUserService, UserConsole],
  exports: [AuthUserService],
})
export class AuthUserModule {}
