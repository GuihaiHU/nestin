import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  Logger,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { WechatMessageDto } from './wechat-message.dto';
import { Action, CrudActions } from '@nestjsx/crud';
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
  @Action('WECHAT_MESSAGE')
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
