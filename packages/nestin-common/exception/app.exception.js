"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppException extends Error {
    constructor(message, config = {}) {
        super(message);
        this.message = message;
        this.status = 'fail';
        this.config = config;
        this.status = this.config.status === undefined || this.config.status === 'fail' ? 'fail' : 'error';
        this.data = {
            failCode: this.config.code,
        };
        if (typeof message === 'string') {
            this.data.msg = message;
        }
        else {
            this.data = Object.assign(this.data, { msg: message });
        }
    }
    getResponse() {
        return {
            status: this.status,
            data: this.data,
        };
    }
    getStatus() {
        if (this.config.httpCode) {
            return this.config.httpCode;
        }
        return this.status === 'error' ? 500 : 200;
    }
}
exports.AppException = AppException;
//# sourceMappingURL=app.exception.js.map