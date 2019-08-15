import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { WechatMessageService } from './wechat-message.service';

@ApiUseTags('微信客服')
@Controller('wechat-message')
@UseInterceptors(ClassSerializerInterceptor)
export class WechatMessageController {
  protected log;
  constructor(public service: WechatMessageService) {
    this.log = Logger;
  }

  @ApiOperation({ title: '消息推送验证接口' })
  @Get('verify/open')
  async verifyNotification(@Query() query) {
    this.log.log('wechat-Data', JSON.stringify(query));
    return await this.service.verifyNotification(query);
  }

  @ApiOperation({ title: '消息推送发送接口' })
  @Post('verify/open')
  async sendMessage(@Query() query, @Body() body) {
    if (body.Content === '1' || body.Content === 1) {
      const res = await this.service.sendMessage(query);
      return res;
    }
  }
}
