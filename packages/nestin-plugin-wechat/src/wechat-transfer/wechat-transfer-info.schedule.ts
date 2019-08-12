import { NestSchedule, Timeout } from 'nest-schedule';
import { Injectable, Logger } from '@nestjs/common';
import { WechatTransferService } from './wechat-transfer.service';

@Injectable()
export class WechatTransferInfoSchedule extends NestSchedule {
  private logger = new Logger();
  constructor(private wechatTransferService: WechatTransferService) {
    super();
  }
}
