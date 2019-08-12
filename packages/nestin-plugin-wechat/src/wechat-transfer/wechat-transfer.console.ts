import { ConsoleService } from 'nestjs-console';
import { WechatTransferService } from './wechat-transfer.service';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class WechatTransferConsole {
  private readonly logger: Logger = new Logger();
  constructor(
    private readonly consoleService: ConsoleService,
    private readonly wechatTransfersService: WechatTransferService,
  ) {
    const cli = this.consoleService.getCli();
    cli
      .command('wechat-transfers:send')
      .description('企业付款-零钱 发给测试号零钱')
      .action(this.transfers.bind(this));

    cli
      .command('wechat-transfers:info')
      .description('企业付款-零钱 查询订单')
      .action(this.getTransferInfo.bind(this));
  }

  async transfers() {
    try {
      this.logger.log('开始给测试号发1分钱');
      await this.wechatTransfersService.transfers('10000', 'op9ls0YUuMJQPZvmw_tpBMSZv1Do', 1);
    } catch (err) {
      this.logger.error(err);
    }
    process.exit(0);
  }

  async getTransferInfo() {
    try {
      const result = await this.wechatTransfersService.getTransferInfo('10000');
      this.logger.log(result);
    } catch (err) {
      this.logger.error(err);
    }
    process.exit(0);
  }
}
