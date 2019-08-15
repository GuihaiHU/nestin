import { Repository } from 'typeorm';
import { CommonService } from 'nestin-common/service/common.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRole } from './role.entity';

@Injectable()
export class AuthRoleService extends CommonService<AuthRole> {
  constructor(@InjectRepository(AuthRole) repo: Repository<AuthRole>) {
    super(repo);
  }
}
