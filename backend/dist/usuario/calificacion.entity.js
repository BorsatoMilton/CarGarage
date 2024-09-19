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
import { Usuario } from './usuario.entity.js';
import { Vehiculo } from '../vehiculo/vehiculo.entity.js';
let Calificacion = class Calificacion extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], Calificacion.prototype, "fechaCalificacion", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Calificacion.prototype, "valoracion", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Calificacion.prototype, "observacion", void 0);
__decorate([
    ManyToOne(() => Usuario, { nullable: true }),
    __metadata("design:type", Object)
], Calificacion.prototype, "usuario", void 0);
__decorate([
    ManyToOne(() => Vehiculo, { nullable: true }),
    __metadata("design:type", Object)
], Calificacion.prototype, "vehiculo", void 0);
Calificacion = __decorate([
    Entity()
], Calificacion);
export { Calificacion };
//# sourceMappingURL=calificacion.entity.js.map