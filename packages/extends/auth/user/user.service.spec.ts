import { ConfigModule } from 'nestjs-config';
import { AuthRole } from '../role/role.entity';
import { AuthUser } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthUserService } from './user.service';
import * as path from 'path';

describe('UserService', () => {
  let service: AuthUserService;
  let user: AuthUser;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        ConfigModule.load(path.resolve(__dirname, '..', 'config', '**/!(*.d).{ts,js}')),
        TypeOrmModule.forFeature([AuthUser, AuthRole]),
      ],
      providers: [AuthUserService],
    }).compile();
    let _: any;
    service = module.get<AuthUserService>(AuthUserService);
    await service.findOrCreate({ username: 'admin', password: 'admin', roleNames: ['admin'] });
    await service.findOrCreate({ username: 'admin2', password: 'admin', roleNames: ['admin'], isActive: false });
    await service.findOrCreate({ username: 'manager', password: '123456', roleNames: ['manager'] });
    [user, _] = await service.findOrCreate({ username: 'ahai', password: '123456', roleNames: ['customer'] });
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('超级管理员-正常登陆', async () => {
    await expect(service.verifyAdminLogin('admin', 'admin')).resolves.toMatchObject({ username: 'admin' });
  });
  it('普通管理员-正常登陆', async () => {
    await expect(service.verifyAdminLogin('manager', '123456')).resolves.toMatchObject({ username: 'manager' });
  });
  it('管理员-密码错误验证', async () => {
    await expect(service.verifyAdminLogin('admin', '123456789')).rejects.toThrow('用户名密码不匹配');
  });
  it('管理员-角色错误', async () => {
    await expect(service.verifyAdminLogin('ahai', '123456')).rejects.toThrow('您没有管理员权限，无法登陆');
  });
  it('管理员-禁止登陆', async () => {
    await expect(service.verifyAdminLogin('admin2', 'admin')).rejects.toThrow('您已被禁止登录，请联系管理员');
  });
  it('用户不存在', async () => {
    await expect(service.verifyAdminLogin('admin3', 'admin')).rejects.toThrow('用户不存在');
  });
  it('修改密码-密码错误', async () => {
    await expect(service.changePwd(user, { oldPassword: '1234', newPassword: 'abc' })).rejects.toThrow(
      '原密码错误，请重新输入',
    );
  });
  it('修改密码', async () => {
    await expect(service.changePwd(user, { oldPassword: '123456', newPassword: '12345678' })).resolves.toMatchObject({
      username: 'ahai',
    });
    await service.changePwd(user, { oldPassword: '12345678', newPassword: '123456' });
  });
  it('查找并创建用户-查找', async () => {
    await expect(service.findOrCreate({ username: 'ahai', roleNames: ['customer'] })).resolves.toEqual(
      expect.arrayContaining([false]),
    );
  });
  it('查找并创建用户-创建', async () => {
    await expect(service.findOrCreate({ username: 'ahai2', roleNames: ['customer'] })).resolves.toEqual(
      expect.arrayContaining([true]),
    );
    await service.deleteOne([{ field: 'username', operator: 'eq', value: 'ahai2' }]);
  });
  it('更新用户信息-user', async () => {
    await expect(service.updateEntity(user, { phone: '13800138000' })).resolves.toMatchObject({ phone: '13800138000' });
  });
  it('更新用户信息-id', async () => {
    await expect(service.updateEntity(user.id, { phone: '10086' })).resolves.toMatchObject({ phone: '10086' });
  });
  it('更新用户信息-空密码', async () => {
    await expect(service.updateEntity(user, { password: '' })).rejects.toThrow('密码不能为空');
  });
  afterAll(async () => {
    await service.deleteOne([{ field: 'username', operator: 'eq', value: 'admin' }]);
    await service.deleteOne([{ field: 'username', operator: 'eq', value: 'admin2' }]);
    await service.deleteOne([{ field: 'username', operator: 'eq', value: 'manager' }]);
    await service.deleteOne([{ field: 'username', operator: 'eq', value: 'ahai' }]);
  });
});
