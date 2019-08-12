"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityNotFoundError_1 = require("typeorm/error/EntityNotFoundError");
const common_1 = require("@nestjs/common");
const app_exception_1 = require("../exception/app.exception");
const typeorm_1 = require("typeorm");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger();
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        switch (exception.constructor) {
            case common_1.UnauthorizedException:
                response.status(exception.getStatus()).json({
                    status: 'error',
                    data: {
                        msg: exception.getResponse()['message'] || '认证未通过',
                    },
                });
                break;
            case common_1.NotFoundException:
                response.status(exception.getStatus()).json({
                    status: 'error',
                    data: {
                        msg: '访问路径不存在',
                    },
                });
                break;
            case EntityNotFoundError_1.EntityNotFoundError:
                this.logger.warn({
                    exception: exception.message,
                    stack: typeof exception.stack === 'string' ? exception.stack.split('\n') : exception.stack,
                });
                response.status(404).json({
                    status: 'error',
                    data: { msg: '数据不存在' },
                });
                break;
            case app_exception_1.AppException:
                exception.getStatus() === 200
                    ? this.logger.warn(exception.message)
                    : this.logger.error({
                        exception: exception.message,
                        stack: typeof exception.stack === 'string' ? exception.stack.split('\n') : exception.stack,
                    });
                response.status(exception.getStatus()).json(exception.getResponse());
                break;
            case typeorm_1.QueryFailedError:
                this.logger.error(JSON.stringify(exception));
            default:
                if (exception.name === 'QueryFailedError') {
                    this.logger.error(JSON.stringify(exception));
                }
                else {
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
};
HttpExceptionFilter = __decorate([
    common_1.Catch()
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http.exception.filter.js.map