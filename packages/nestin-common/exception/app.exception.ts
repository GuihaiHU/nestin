import { HttpException } from '@nestjs/common';

/**
 * 业务报错
 * status:
 *    error: 服务器报错，http状态码通常为500
 *    fail: 业务执行失败，http状态码通常为200
 *    custom: 自定义错误，http状态码由第三个参数指定
 * data.msg: 报错内容提示
 * data.failCode: 当 status 为fail时，业务失败码
 */
export class AppException extends Error {
  protected data: any;
  protected status: string = 'fail';
  protected config;
  constructor(readonly message: any | object, config: { status?: string; code?: number; httpCode?: number } = {}) {
    super(message);
    this.config = config;
    this.status = this.config.status === undefined || this.config.status === 'fail' ? 'fail' : 'error';
    this.data = {
      failCode: this.config.code,
    };
    if (typeof message === 'string') {
      this.data.msg = message;
    } else {
      this.data = Object.assign(this.data, { msg: message });
    }
  }

  getResponse(): object {
    return {
      status: this.status,
      data: this.data,
    };
  }

  getStatus(): number {
    if (this.config.httpCode) {
      return this.config.httpCode;
    }
    return this.status === 'error' ? 500 : 200;
  }
}
