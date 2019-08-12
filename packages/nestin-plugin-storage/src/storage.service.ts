import { ConfigService } from 'nestjs-config';

import { AppException } from 'nestin-common/exception/app.exception';
import { Injectable } from '@nestjs/common';

import { proxyHandler } from '../common/proxy-handler';
import { LocalService } from './service/local.service';
import { StorageOption } from './storage.interface';

@Injectable()
export class StorageService {
  private config;
  private option;
  private service;
  constructor(private readonly localService: LocalService, private readonly configService: ConfigService) {
    this.config = this.configService.get('storage');
    return this.switch();
  }

  switch(optionName?: string, serviceOption?: StorageOption) {
    // 获取配置选项的名称
    optionName = optionName || this.config.default;
    // 选中的配置选项
    this.option = this.config.options[optionName];

    // 选型对应的服务名称
    const serviceName = this.option.name;
    // 获取具体的服务
    this.service = this[`${serviceName}Service`];

    if (!this.service) {
      throw new AppException('找不到对应的服务', { code: 10404 });
    }
    // 对服务进行配置
    this.service.config = Object.assign({}, this.option, serviceOption);
    return new Proxy(this, proxyHandler);
  }
}
