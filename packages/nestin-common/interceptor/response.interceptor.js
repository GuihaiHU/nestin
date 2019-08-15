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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nestjs_config_1 = require("nestjs-config");
const core_1 = require("@nestjs/core");
let ResponseInterceptor = class ResponseInterceptor {
    constructor(configService) {
        this.configService = configService;
        this.reflector = new core_1.Reflector();
    }
    intercept(context, next) {
        return next.handle();
    }
};
ResponseInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_config_1.ConfigService !== "undefined" && nestjs_config_1.ConfigService) === "function" ? _a : Object])
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map