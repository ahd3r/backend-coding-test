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
exports.RidesEntity = void 0;
const typeorm_1 = require("typeorm");
let RidesEntity = class RidesEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'int', name: 'rideID' }),
    __metadata("design:type", Number)
], RidesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: 'startLat' }),
    __metadata("design:type", Number)
], RidesEntity.prototype, "startLat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: 'startLong' }),
    __metadata("design:type", Number)
], RidesEntity.prototype, "startLong", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: 'endLat' }),
    __metadata("design:type", Number)
], RidesEntity.prototype, "endLat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: 'endLong' }),
    __metadata("design:type", Number)
], RidesEntity.prototype, "endLong", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'riderName' }),
    __metadata("design:type", String)
], RidesEntity.prototype, "riderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'driverName' }),
    __metadata("design:type", String)
], RidesEntity.prototype, "driverName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'driverVehicle' }),
    __metadata("design:type", String)
], RidesEntity.prototype, "driverVehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => 'CURRENT_TIMESTAMP', name: 'created' }),
    __metadata("design:type", Date)
], RidesEntity.prototype, "createdAt", void 0);
RidesEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Rides' })
], RidesEntity);
exports.RidesEntity = RidesEntity;
//# sourceMappingURL=rides.js.map