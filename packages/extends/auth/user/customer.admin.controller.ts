import { Controller, Get, Query } from '@nestjs/common';
import { AuthUserService } from './user.service';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { QueryDto } from 'nestin-common/restful/query.dto';
import { Action, CrudActions } from '@nestjsx/crud';

@ApiUseTags('用户管理')
@ApiBearerAuth()
@Roles('admin', 'manager')
@Controller('admin/user/customer')
export class AuthUserCustomerAdminController {
  constructor(public service: AuthUserService) {}
}
