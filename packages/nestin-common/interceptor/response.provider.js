"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const response_interceptor_1 = require("./response.interceptor");
const nestjs_config_1 = require("nestjs-config");
exports.responseProvider = {
    provide: core_1.APP_INTERCEPTOR,
    useFactory: (configService) => {
        return new response_interceptor_1.ResponseInterceptor(configService);
    },
    inject: [nestjs_config_1.ConfigService],
};
//# sourceMappingURL=response.provider.js.map