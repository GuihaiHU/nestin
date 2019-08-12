import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { AuthRoleService } from './role.service';
import { AuthRole } from './role.entity';
import { RoleConsole } from './role.console';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRole])],
  controllers: [RoleController],
  providers: [AuthRoleService, RoleConsole],
  exports: [AuthRoleService],
})
export class AuthRoleModule {}
