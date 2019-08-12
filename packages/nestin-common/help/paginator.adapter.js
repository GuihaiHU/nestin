"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginatorAdapter {
    constructor(data, total, page, limit) {
        this.data = data;
        this.total = total;
        this.count = limit;
        this.page = page;
        this.pageCount = Math.ceil(total / limit);
    }
}
exports.PaginatorAdapter = PaginatorAdapter;
//# sourceMappingURL=paginator.adapter.js.map