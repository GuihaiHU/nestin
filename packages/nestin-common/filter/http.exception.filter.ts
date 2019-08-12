import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { AppException } from '../exception/app.exception';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger();
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    switch (exception.constructor) {
      case UnauthorizedException:
        response.status(exception.getStatus()).json({
          status: 'error',
          data: {
            msg: exception.getResponse()['message'] || '认证未通过',
          },
        });
        break;
      case NotFoundException:
        response.status(exception.getStatus()).json({
          status: 'error',
          data: {
            msg: '访问路径不存在',
          },
        });
        break;
      case EntityNotFoundError:
        this.logger.warn({
          exception: exception.message,
          stack: typeof exception.stack === 'string' ? exception.stack.split('\n') : exception.stack,
        });
        response.status(404).json({
          status: 'error',
          data: { msg: '数据不存在' },
        });
        break;
      case AppException:
        exception.getStatus() === 200
          ? this.logger.warn(exception.message)
          : this.logger.error({
              exception: exception.message,
              stack: typeof exception.stack === 'string' ? exception.stack.split('\n') : exception.stack,
            });
        response.status(exception.getStatus()).json(exception.getResponse());
        break;
      case QueryFailedError:
        this.logger.error(JSON.stringify(exception));
      // 这里没有break，使用default的response
      // TODO: 应该更加智能的提示错误类型
      default:
        if (exception.name === 'QueryFailedError') {
          this.logger.error(JSON.stringify(exception));
        } else {
          this.logger.error({
            exception: {
              name: exception.name,
              msg: exception.message,
              stack: typeof exception.stack === 'string' ? exception.stack.split('\n') : exception.stack,
            },
            request: {
              body: request.body,
              header: request.header,
              query: request.query,
              params: request.params,
            },
          });
        }
        response.status(exception.getStatus ? exception.getStatus() : 500).json({
          status: 'error',
          data: {
            msg: exception.getResponse
              ? exception.getResponse()['message'] || exception.getResponse()['error'] || exception.getResponse()
              : '未知错误',
          },
        });
        break;
    }
  }
}
