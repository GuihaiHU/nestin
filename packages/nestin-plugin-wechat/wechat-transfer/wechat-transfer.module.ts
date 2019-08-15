import { Module } from '@nestjs/common';

import { WechatTransferController } from './wechat-transfer.controller';
import { WechatTransferService } from './wechat-transfer.service';
import { WechatTransferConsole } from './wechat-transfer.console';
import { WechatTransferInfoSchedule } from './wechat-transfer-info.schedule';

@Module({
  imports: [],
  providers: [WechatTransferService, WechatTransferConsole, WechatTransferInfoSchedule],
  controllers: [WechatTransferController],
  exports: [WechatTransferService],
})
export class WechatTransferModule {}
