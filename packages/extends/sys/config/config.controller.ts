import { Controller } from '@nestjs/common';
import { SysConfigService } from './sys-config.service';

@Controller('sys-config')
export class SysConfigController {
  constructor(readonly service: SysConfigService) {}
}
