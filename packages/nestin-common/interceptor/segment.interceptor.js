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
const core_1 = require("@nestjs/core");
let SegmentInterceptor = class SegmentInterceptor {
    constructor() {
        this.reflector = new core_1.Reflector();
    }
    getInfoAsSegment(obj, segments) {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && segments.indexOf(key) !== -1) {
                result[key] = obj[key];
            }
        }
        return result;
    }
    intercept(context, next) {
        return next.handle().pipe(operators_1.map(data => {
            const segments = this.reflector.get('responseSegment', context.getHandler());
            if (segments) {
                if (data instanceof Array) {
                    return data.map(item => this.getInfoAsSegment(item, segments));
                }
                else {
                    return this.getInfoAsSegment(data, segments);
                }
            }
            return data;
        }));
    }
};
SegmentInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SegmentInterceptor);
exports.SegmentInterceptor = SegmentInterceptor;
//# sourceMappingURL=segment.interceptor.js.map