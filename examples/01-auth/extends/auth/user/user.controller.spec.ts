import { AuthUserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthUserController } from './user.controller';

describe('User Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AuthUserService],
      controllers: [AuthUserController],
    })
      .overrideProvider(AuthUserService)
      .useValue({})
      .compile();
  });
  it('should be defined', () => {
    const controller: AuthUserController = module.get<AuthUserController>(AuthUserController);
    expect(controller).toBeDefined();
  });
});
