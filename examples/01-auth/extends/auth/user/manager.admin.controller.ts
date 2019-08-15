import { AppException } from 'nestin-common/exception/app.exception';
import { UserInfoDto } from './dto/user-info.dto';
import { Controller, Param, Query } from '@nestjs/common';
import { AuthUserService } from './user.service';
import { AuthUser } from './user.entity';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { RestQueryDto } from 'nestin-plugin-restful/dto/query.dto';
import { RestController } from 'nestin-plugin-restful/rest.controller';

@ApiUseTags('管理员管理')
@ApiBearerAuth()
@Roles('admin', 'manager')
@Controller('admin/user/manager')
export class AuthUserManagerAdminController extends RestController<AuthUser> {
  constructor(service: AuthUserService) {
    super(service);
  }

  // @Override()
  // @ApiOperation({ title: '修改管理员信息：重置密码，禁用' })
  // async updateOne(@Param('id') id: number, @ParsedBody() dto: UserInfoDto) {
  //   await this.service.updateEntity(id, dto);
  //   return '修改成功';
  // }

  // @Override()
  // async createOne(@ParsedBody() userDto: UserInfoDto) {
  //   const [data, created] = await this.service.findOrCreate({
  //     username: userDto.username,
  //     password: userDto.password,
  //     roleNames: ['manager'],
  //   });
  //   if (created) {
  //     return '创建成功';
  //   } else {
  //     throw new AppException('用户名已存在，创建失败！');
  //   }
  // }

  // @Override()
  // async getMany(@Query() dto: RestQueryDto) {
  //   return await this.service.getManagerUsers(dto);
  // }
}
