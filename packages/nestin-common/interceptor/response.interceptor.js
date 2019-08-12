"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const crud_1 = require("@nestjsx/crud");
const nestjs_config_1 = require("nestjs-config");
const response_1 = require("../response");
const core_1 = require("@nestjs/core");
let ResponseInterceptor = class ResponseInterceptor {
    constructor(configService) {
        this.configService = configService;
        this.reflector = new core_1.Reflector();
    }
    intercept(context, next) {
        const action = crud_1.getAction(context.getHandler());
        const query = context.switchToHttp().getRequest().query;
        if (action === crud_1.CrudActions.ReadAll) {
            query.page = query.page || 1;
            query.limit = query.limit || this.configService.get('crud.limit');
            query.offset = (query.page - 1) * query.limit;
            return next.handle().pipe(operators_1.map(data => {
                return {
                    data: data.data || [],
                    meta: { total: data.total, size: data.count, page: data.page, pageCount: data.pageCount },
                    status: 'success',
                };
            }));
        }
        else {
            return next.handle().pipe(operators_1.map(data => {
                const responseStyle = this.reflector.get('responseStyle', context.getHandler());
                if (responseStyle === 'plain') {
                    return data;
                }
                else {
                    return data instanceof response_1.Response ? data : new response_1.Response(data);
                }
            }));
        }
    }
};
ResponseInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_config_1.ConfigService])
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map