import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ResponseStyle } from 'nestin-common/decorator/response-style.decorator';

@Controller()
export class AppController {
  @Get('/')
  @ResponseStyle('plain')
  root() {
    return '<html><h1>Welcome to Nestin!</h1></html>';
  }
}
