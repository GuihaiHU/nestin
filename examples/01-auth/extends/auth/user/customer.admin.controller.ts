import { Controller } from '@nestjs/common';
import { AuthUserService } from './user.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';

@ApiUseTags('用户管理')
@ApiBearerAuth()
@Roles('admin', 'manager')
@Controller('admin/user/customer')
export class AuthUserCustomerAdminController {
  constructor(public service: AuthUserService) {}
}
