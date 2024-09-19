var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Compra } from './compra.entity.js';
import { Vehiculo } from '../vehiculo/vehiculo.entity.js';
let LineaCompra = class LineaCompra extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], LineaCompra.prototype, "cantidad", void 0);
__decorate([
    ManyToOne(() => Compra, { nullable: false }),
    __metadata("design:type", Object)
], LineaCompra.prototype, "compra", void 0);
__decorate([
    ManyToOne(() => Vehiculo, { nullable: false }),
    __metadata("design:type", Object)
], LineaCompra.prototype, "vehiculo", void 0);
LineaCompra = __decorate([
    Entity()
], LineaCompra);
export { LineaCompra };
//# sourceMappingURL=lineacompra.entity.js.map