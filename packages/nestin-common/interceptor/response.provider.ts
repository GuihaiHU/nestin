import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response.interceptor';
import { ConfigService } from 'nestjs-config';

export const responseProvider = {
  provide: APP_INTERCEPTOR,
  useFactory: (configService: ConfigService) => {
    return new ResponseInterceptor(configService);
  },
  inject: [ConfigService],
};
