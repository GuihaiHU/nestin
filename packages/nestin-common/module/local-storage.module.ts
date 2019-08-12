import * as fs from 'fs';
import { diskStorage } from 'multer';
import { ConfigModule, ConfigService } from 'nestjs-config';

import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

async function storageFactory(configService: ConfigService) {
  if (!fs.existsSync(configService.get('app.multerDest'))) {
    fs.mkdirSync(configService.get('app.multerDest'));
  }
  const storage = diskStorage({
    destination(req, file, cb) {
      const nameArr = file.originalname.split('.');
      const ext = nameArr[nameArr.length - 1];
      if (ext === 'xlsx' || ext === 'xls') {
        cb(null, configService.get('app.excelMulterDest'));
      } else {
        cb(null, configService.get('app.multerDest'));
      }
    },
    filename(req, file, cb) {
      const nameArr = file.originalname.split('.');
      const ext = nameArr[nameArr.length - 1];
      if (ext === 'xlsx' || ext === 'xls') {
        cb(null, configService.get('app.avatarFile'));
      } else {
        cb(null, Date.now() + '.' + ext);
      }
    },
  });
  return {
    storage,
  };
}

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: storageFactory,
      inject: [ConfigService],
    }),
  ],
  exports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: storageFactory,
      inject: [ConfigService],
    }),
  ],
})
export class GlobalLocalStorageModule {}
