import { Module, Global } from '@nestjs/common';

import { LocalService } from './service/local.service';
import { StorageService } from './storage.service';
import { ConfigModule } from 'nestjs-config';

const storageServiceProvider = {
  provide: 'storage',
  useClass: StorageService,
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [storageServiceProvider, LocalService, StorageService],
  exports: [storageServiceProvider],
})
export class StorageModule {}
