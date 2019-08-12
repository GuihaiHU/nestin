import './alias';
import chalk from 'chalk';
import { Column } from 'typeorm';
// TODO: tmp fix for strange error: TypeError: typeorm_1.Entity is not a function
const x = Column;
const c = console;
import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

BootstrapConsole.init({ module: AppModule })
  .then(({ app, boot }) => {
    // do something with your app container if you need (app)
    app.useLogger(app.get(Logger));
    initializeTransactionalContext(); // Initialize cls-hooked
    patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.

    // boot the cli
    boot(/*process.argv*/);
  })
  .catch(e => c.log(chalk.red('Error'), e));
