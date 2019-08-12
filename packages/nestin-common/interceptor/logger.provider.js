"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const logger_interceptor_1 = require("./logger.interceptor");
exports.loggerProvider = {
    provide: core_1.APP_INTERCEPTOR,
    useClass: logger_interceptor_1.LoggingInterceptor,
};
//# sourceMappingURL=logger.provider.js.map