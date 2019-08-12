import { AppException } from 'nestin-common/exception/app.exception';
import { UserInfoDto } from './dto/user-info.dto';
import { Controller, Param, Query } from '@nestjs/common';
import { AuthUserService } from './user.service';
import { AuthUser } from './user.entity';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { Crud, CrudController, ParsedBody, Override } from '@nestjsx/crud';
import { QueryDto } from 'nestin-common/restful/query.dto';

@Crud(AuthUser, {
  routes: {
    only: ['createOneBase', 'getManyBase', 'updateOneBase'],
  },
})
@ApiUseTags('管理员管理')
@ApiBearerAuth()
@Roles('admin', 'manager')
@Controller('admin/user/manager')
export class AuthUserManagerAdminController {
  constructor(public service: AuthUserService) {}

  get base(): CrudController<AuthUserService, AuthUser> {
    return this;
  }

  @Override()
  @ApiOperation({ title: '修改管理员信息：重置密码，禁用' })
  async updateOne(@Param('id') id: number, @ParsedBody() dto: UserInfoDto) {
    await this.service.updateEntity(id, dto);
    return '修改成功';
  }

  @Override()
  async createOne(@ParsedBody() userDto: UserInfoDto) {
    const [data, created] = await this.service.findOrCreate({
      username: userDto.username,
      password: userDto.password,
      roleNames: ['manager'],
    });
    if (created) {
      return '创建成功';
    } else {
      throw new AppException('用户名已存在，创建失败！');
    }
  }

  @Override()
  async getMany(@Query() dto: QueryDto) {
    return await this.service.getManagerUsers(dto);
  }
}
