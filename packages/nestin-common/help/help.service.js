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
const moment = require("moment");
let HelpService = class HelpService {
    constructor(configService) {
        this.configService = configService;
    }
    storageUrl(filename) {
        return `${this.configService.get('app.baseUrl')}/upload/${filename}`;
    }
    avatarUrl(filename) {
        return `${this.configService.get('app.baseUrl')}/upload/avatar/${filename}.JPG`;
    }
    templateUrl(filename) {
        return `${this.configService.get('app.baseUrl')}/template/${filename}`;
    }
    getWorkType(d) {
        const h = d.getHours();
        const m = d.getMinutes();
        if (h > this.configService.get('app.dayWorkHour') && h < this.configService.get('app.nightWorkHour')) {
            return 'day';
        }
        else if (h === this.configService.get('app.dayWorkHour') && m >= this.configService.get('app.dayWorkMin')) {
            return 'day';
        }
        else if (h === this.configService.get('app.nightWorkHour') && m < this.configService.get('app.nightWorkMin')) {
            return 'day';
        }
        else {
            return 'night';
        }
    }
    getWorkInfo(d) {
        const workType = this.getWorkType(d);
        if (workType === 'day') {
            return {
                workDate: moment(d)
                    .startOf('d')
                    .toDate(),
                workType,
            };
        }
        else {
            const h = d.getHours();
            if (h >= this.configService.get('app.nightWorkHour')) {
                return {
                    workDate: moment(d)
                        .startOf('d')
                        .toDate(),
                    workType,
                };
            }
            else {
                return {
                    workDate: moment(d)
                        .startOf('d')
                        .subtract(1, 'd')
                        .toDate(),
                    workType,
                };
            }
        }
    }
};
HelpService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_config_1.ConfigService !== "undefined" && nestjs_config_1.ConfigService) === "function" ? _a : Object])
], HelpService);
exports.HelpService = HelpService;
//# sourceMappingURL=help.service.js.map