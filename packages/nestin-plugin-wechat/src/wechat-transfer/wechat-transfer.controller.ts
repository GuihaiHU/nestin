import { Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { WechatTransferService } from './wechat-transfer.service';

@ApiUseTags('企业付款-零钱')
@ApiBearerAuth()
@Controller('wechat-transfers')
export class WechatTransferController {
  constructor(private readonly wechatTransfersService: WechatTransferService) {}

  // @ApiOperation({ title: '测试：发给测试号零钱' })
  // @Post()
  // async transfers() {
  //   await this.wechatTransfersService.transfers('100001', 'op9ls0YUuMJQPZvmw_tpBMSZv1Do', 1);
  // }

  // @ApiOperation({ title: '测试：企业付款-零钱 订单信息查询' })
  // @Get()
  // async getTransfersInfo() {
  //   await this.wechatTransfersService.getTransferInfo('100001');
  // }
}
