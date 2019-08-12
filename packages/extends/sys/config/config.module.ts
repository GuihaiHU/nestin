import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SysConfigController } from './config.controller';
import { SysConfigService } from './config.service';
import { SysConfig } from './config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysConfig])],
  controllers: [SysConfigController],
  providers: [SysConfigService],
  exports: [SysConfigService],
})
export class SysConfigModule {}
