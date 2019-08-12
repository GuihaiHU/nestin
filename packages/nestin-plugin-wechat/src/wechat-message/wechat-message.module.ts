import { Module, HttpModule } from '@nestjs/common';
import { WechatMessageController } from './wechat-message.controller';
import { WechatMessageService } from './wechat-message.service';
import { redisProvider } from '@plugin/redis';

@Module({
  imports: [HttpModule],
  controllers: [WechatMessageController],
  providers: [WechatMessageService, redisProvider],
})
export class WechatMessageModule {}
