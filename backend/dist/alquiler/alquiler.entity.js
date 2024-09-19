var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, DateTimeType } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Vehiculo } from '../vehiculo/vehiculo.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';
let Alquiler = class Alquiler extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], Alquiler.prototype, "fechaAlquiler", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", DateTimeType)
], Alquiler.prototype, "fechaHoraInicioAlquiler", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", DateTimeType)
], Alquiler.prototype, "fechaHoraDevolucion", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Alquiler.prototype, "estadoAlquiler", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Alquiler.prototype, "precioTotal", void 0);
__decorate([
    ManyToOne(() => Usuario, { nullable: false }),
    __metadata("design:type", Object)
], Alquiler.prototype, "locador", void 0);
__decorate([
    ManyToOne(() => Usuario, { nullable: false }),
    __metadata("design:type", Object)
], Alquiler.prototype, "locatario", void 0);
__decorate([
    ManyToOne(() => Vehiculo, { nullable: false }),
    __metadata("design:type", Object)
], Alquiler.prototype, "vehiculo", void 0);
Alquiler = __decorate([
    Entity()
], Alquiler);
export { Alquiler };
//# sourceMappingURL=alquiler.entity.js.map