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
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const app_exception_1 = require("../exception/app.exception");
const entity_unique_and_1 = require("./entity-rule/entity-unique-and");
const entity_unique_or_1 = require("./entity-rule/entity-unique-or");
let EntityService = class EntityService {
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    create(entity, uniqueRules) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entity.id) {
                delete entity.id;
            }
            this.uniqueCheck(entity, uniqueRules);
            return this.entityRepository.save(entity);
        });
    }
    update(entity, newEntity, uniqueRules) {
        return __awaiter(this, void 0, void 0, function* () {
            entity = yield this.getEntity(entity);
            if (newEntity.hasOwnProperty('id')) {
                delete newEntity.id;
            }
            entity = Object.assign(entity, newEntity);
            yield this.uniqueCheck(entity, uniqueRules);
            return this.entityRepository.save(entity);
        });
    }
    delete(entityId, forceDelete = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.entityRepository.findOne(entityId);
            if (!forceDelete && !entity) {
                throw new app_exception_1.AppException('该删除对象不存在', { httpCode: 400 });
            }
            return this.entityRepository.delete(entityId);
        });
    }
    uniqueCheck(entity, uniqueRules) {
        return __awaiter(this, void 0, void 0, function* () {
            if (uniqueRules instanceof entity_unique_and_1.EntityUniqueRulesAnd) {
                const params = {};
                uniqueRules.columnNames.forEach(column => {
                    params[column] = entity[column];
                });
                if (entity.hasOwnProperty('id')) {
                    params['id'] = typeorm_1.Not(typeorm_1.Equal(entity.id));
                }
                if (yield this.entityRepository.count(params)) {
                    throw new app_exception_1.AppException(uniqueRules.description || `${uniqueRules.columnNames}存在唯一冲突`, {
                        code: uniqueRules.failCode || 2002,
                    });
                }
            }
            if (uniqueRules instanceof entity_unique_or_1.EntityUniqueRulesOr) {
                for (const rule of uniqueRules.rules) {
                    if (!entity[rule.columnName]) {
                        return;
                    }
                    const params = { [rule.columnName]: entity[rule.columnName] };
                    if (entity.hasOwnProperty('id')) {
                        params.id = typeorm_1.Not(typeorm_1.Equal(entity.id));
                    }
                    const hitResult = yield this.entityRepository.count(params);
                    if (hitResult) {
                        throw new app_exception_1.AppException(rule.description || `${rule.columnName}存在唯一冲突`, { code: rule.failCode || 2002 });
                    }
                }
            }
        });
    }
    getEntity(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof entity === 'number') {
                return this.entityRepository.findOneOrFail(entity);
            }
            return entity;
        });
    }
};
EntityService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], EntityService);
exports.EntityService = EntityService;
//# sourceMappingURL=entity.service.js.map