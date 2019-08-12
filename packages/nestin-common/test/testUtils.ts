import { TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalConsoleModule } from '../src/module/console.module';
import { AuthUserModule } from '@app/auth/user/user.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { AuthUserService } from '@app/auth/user/user.service';

export function getBaseTestDependence(...entities) {
  return [
    GlobalConsoleModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature(entities),
    ConfigModule.load(path.resolve(__dirname, '..', '..', 'config', '**/!(*.d).{ts,js}')),
    AuthUserModule,
  ];
}

export async function getUser(module: TestingModule, username = 'test-customer') {
  const userService = module.get<AuthUserService>(AuthUserService);
  return userService.findOne({ username: 'test-customer' });
}
