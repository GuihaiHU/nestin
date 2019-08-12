import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger.interceptor';

export const loggerProvider = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
};
