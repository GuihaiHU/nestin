"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const multer_1 = require("multer");
const nestjs_config_1 = require("nestjs-config");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
function storageFactory(configService) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.existsSync(configService.get('app.multerDest'))) {
            fs.mkdirSync(configService.get('app.multerDest'));
        }
        const storage = multer_1.diskStorage({
            destination(req, file, cb) {
                const nameArr = file.originalname.split('.');
                const ext = nameArr[nameArr.length - 1];
                if (ext === 'xlsx' || ext === 'xls') {
                    cb(null, configService.get('app.excelMulterDest'));
                }
                else {
                    cb(null, configService.get('app.multerDest'));
                }
            },
            filename(req, file, cb) {
                const nameArr = file.originalname.split('.');
                const ext = nameArr[nameArr.length - 1];
                if (ext === 'xlsx' || ext === 'xls') {
                    cb(null, configService.get('app.avatarFile'));
                }
                else {
                    cb(null, Date.now() + '.' + ext);
                }
            },
        });
        return {
            storage,
        };
    });
}
let GlobalLocalStorageModule = class GlobalLocalStorageModule {
};
GlobalLocalStorageModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                imports: [nestjs_config_1.ConfigModule],
                useFactory: storageFactory,
                inject: [nestjs_config_1.ConfigService],
            }),
        ],
        exports: [
            platform_express_1.MulterModule.registerAsync({
                imports: [nestjs_config_1.ConfigModule],
                useFactory: storageFactory,
                inject: [nestjs_config_1.ConfigService],
            }),
        ],
    })
], GlobalLocalStorageModule);
exports.GlobalLocalStorageModule = GlobalLocalStorageModule;
//# sourceMappingURL=local-storage.module.js.map