import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { Log4jsModule } from 'nestjs-log4js';
import { GlobalConsoleModule } from 'nestin-common/module/console.module';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ServeStaticMiddleware } from '@nest-middlewares/serve-static';
import { MiddlewareConsumer, Module, ClassSerializerInterceptor } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalLocalStorageModule } from 'nestin-common/module/local-storage.module';
import { MailerModule } from '@nest-modules/mailer';
import { responseProvider } from 'nestin-common/interceptor/response.provider';
import { loggerProvider } from 'nestin-common/interceptor/logger.provider';
import { SegmentInterceptor } from 'nestin-common/interceptor/segment.interceptor';
import { GlobalHelpModule } from 'nestin-common/help/help.module';
import * as path from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    GlobalConsoleModule,
    GlobalHelpModule,
    GlobalLocalStorageModule,
    ConfigModule.load(path.resolve(__dirname, '..', 'config', '**/!(*.d).{ts,js}')),
    Log4jsModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('log'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    // MailerModule.forRootAsync({
    //   useFactory: (config: ConfigService) => ({
    //     transport: config.get('app.mail.transport'),
    //     defaults: {
    //       from: config.get('app.mail.defaultFrom'),
    //       to: config.get('app.mail.defaultTO'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [
    responseProvider,
    loggerProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: SegmentInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    const middlewares: any[] = [];
    if (this.configService.get('app.mode') === 'dev') {
      ServeStaticMiddleware.configure(this.configService.get('app.multerDest'));
      middlewares.push(ServeStaticMiddleware);
    } else {
      HelmetMiddleware.configure({});
      middlewares.push(HelmetMiddleware);
      CorsMiddleware.configure({
        origin: this.configService.get('app.cors.origin', '*'),
        methods: this.configService.get('app.cors.methods', 'GET,HEAD,PUT,PATCH,POST,DELETE'),
        credentials: this.configService.get('app.cors.credentials', true),
      });
      middlewares.push(CorsMiddleware);
    }
    consumer.apply(...middlewares).forRoutes('/');
  }
}
