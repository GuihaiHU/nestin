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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const typeorm_1 = require("typeorm");
const nestjs_config_1 = require("nestjs-config");
let CommonService = class CommonService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
        this.logger = new common_1.Logger();
    }
    findOrCreate(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.repo.findOne(info);
            if (!entity) {
                return [yield this.repo.save(info), true];
            }
            return [entity, false];
        });
    }
    updateEntity(entity, info) {
        return __awaiter(this, void 0, void 0, function* () {
            let e;
            if (isFinite(entity)) {
                e = yield this.repo.findOneOrFail(entity);
            }
            else {
                e = entity;
            }
            Object.assign(e, info);
            return this.repo.save(e);
        });
    }
    getOnly() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOne();
        });
    }
    updateOnly(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = yield this.getOnly();
            return this.repo.save(Object.assign({}, origin, entity));
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.NODE_ENV === 'test') {
                yield this.repo
                    .createQueryBuilder()
                    .delete()
                    .where('id > 0')
                    .execute();
            }
        });
    }
};
__decorate([
    common_1.Inject(nestjs_config_1.ConfigService),
    __metadata("design:type", nestjs_config_1.ConfigService)
], CommonService.prototype, "configService", void 0);
CommonService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map