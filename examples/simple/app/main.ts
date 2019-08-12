import './alias';

import { ConfigService } from 'nestjs-config';
import { HttpExceptionFilter } from 'nestin-common/filter/http.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { AppModule } from './app.module';
import { Log4jsService } from 'nestjs-log4js';

async function bootstrap() {
  initializeTransactionalContext(); // Initialize cls-hooked
  patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  // app.useLogger(app.get(Log4jsService));
  app.setGlobalPrefix(config.get('app.prefix'));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  if (config.get('app.mode') === 'dev') {
    const options = new DocumentBuilder()
      .setTitle('server')
      .setDescription('server接口文档')
      .setVersion('1.0')
      .setBasePath(config.get('app.prefix'))
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document, {
      customCss: `.swagger-ui .topbar { display: none }
        .information-container{display: none} *{font-size: 12px !important}
        .parameter__name,.parameter__type,.parameter__deprecated,.parameter__in {display: inline-block; padding:0 5px}`,
      customSiteTitle: '竞猜小程序api文档',
    });
  }

  await app.listen(config.get('app.app_port'));
}
bootstrap();
