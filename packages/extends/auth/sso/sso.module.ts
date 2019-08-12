import { Module } from '@nestjs/common';
import { AuthSsoService } from './sso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSso } from './sso.entity';
import { AuthUserModule } from '../user/user.module';
import { ConfigModule } from 'nestjs-config';
import { AuthRoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthSso]), AuthUserModule, ConfigModule, AuthRoleModule],
  providers: [AuthSsoService],
  exports: [AuthSsoService],
})
export class AuthSsoModule {}
