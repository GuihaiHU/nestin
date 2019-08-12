import { SysConfig } from './config.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SysConfigService {
  constructor(@InjectRepository(SysConfig) readonly repo: Repository<SysConfig>) {}
  async getConfig(key: string) {
    return this.repo.findOne({ key });
  }
  async delConfig(key: string) {
    return this.repo.delete({ key });
  }
  async updateConfig(key: string, value: any) {
    let config = await this.getConfig(key);
    if (!config) {
      config = new SysConfig();
    }
    config.key = key;
    config.value = value;
    return this.repo.save(config);
  }
}
