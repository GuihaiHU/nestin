"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(data, meta = {}) {
        this.data = data;
        this.meta = meta;
        this.status = 'success';
    }
    addMeta(obj) {
        this.meta = Object.assign(this.meta, obj);
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map